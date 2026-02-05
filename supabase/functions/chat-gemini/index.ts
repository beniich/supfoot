// Supabase Edge Function - Google Gemini
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { message, conversationId, imageUrl } = await req.json()

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            {
                global: {
                    headers: { Authorization: req.headers.get('Authorization')! },
                },
            }
        )

        const {
            data: { user },
        } = await supabaseClient.auth.getUser()

        if (!user) {
            throw new Error('Unauthorized')
        }

        // Retrieve conversation history
        let conversationHistory = []

        if (conversationId) {
            const { data: conversation } = await supabaseClient
                .from('ai_conversations')
                .select('messages')
                .eq('id', conversationId)
                .single()

            if (conversation) {
                conversationHistory = conversation.messages
            }
        }

        // Format messages for Gemini
        const contents = conversationHistory.map(msg => ({
            role: msg.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: msg.content }],
        }))

        // Add new user message (with optional image)
        const newUserParts = [{ text: message }]

        if (imageUrl) {
            // Fetch image and convert to base64
            const imageResponse = await fetch(imageUrl)
            const imageBuffer = await imageResponse.arrayBuffer()
            const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)))

            newUserParts.push({
                inline_data: {
                    mime_type: 'image/jpeg',
                    data: base64Image,
                },
            })
        }

        contents.push({
            role: 'user',
            parts: newUserParts,
        })

        // Call Google Gemini API
        const geminiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${Deno.env.get('GOOGLE_API_KEY')}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: contents,
                    systemInstruction: {
                        parts: [{
                            text: 'Tu es un assistant expert en football. Tu peux analyser des images de matchs, de joueurs, et de tactiques. Tu fournis des analyses détaillées et précises.'
                        }]
                    },
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1000,
                    },
                }),
            }
        )

        const data = await geminiResponse.json()

        if (!geminiResponse.ok) {
            throw new Error(data.error?.message || 'Gemini API error')
        }

        const assistantResponse = data.candidates[0].content.parts[0].text

        // Update conversation history
        conversationHistory.push({ role: 'user', content: message })
        conversationHistory.push({ role: 'assistant', content: assistantResponse })

        // Save to database
        const conversationData = {
            user_id: user.id,
            messages: conversationHistory,
            model: 'gemini-2.0-flash',
            tokens_used: data.usageMetadata?.totalTokenCount || 0,
            provider: 'google',
        }

        let savedConversationId = conversationId

        if (conversationId) {
            await supabaseClient
                .from('ai_conversations')
                .update(conversationData)
                .eq('id', conversationId)
        } else {
            const { data: newConv } = await supabaseClient
                .from('ai_conversations')
                .insert(conversationData)
                .select()
                .single()

            savedConversationId = newConv.id
        }

        return new Response(
            JSON.stringify({
                response: assistantResponse,
                conversationId: savedConversationId,
                tokensUsed: data.usageMetadata?.totalTokenCount || 0,
            }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
        )
    }
})
