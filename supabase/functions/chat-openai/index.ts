// Supabase Edge Function - OpenAI GPT-4
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { message, conversationId } = await req.json()

        // Initialize Supabase client
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            {
                global: {
                    headers: { Authorization: req.headers.get('Authorization')! },
                },
            }
        )

        // Get user from JWT
        const {
            data: { user },
        } = await supabaseClient.auth.getUser()

        if (!user) {
            throw new Error('Unauthorized')
        }

        // Retrieve conversation history if exists
        let messages = [{ role: 'system', content: 'Tu es un assistant expert en football. Tu aides les fans avec des informations sur les matchs, joueurs, et statistiques.' }]

        if (conversationId) {
            const { data: conversation } = await supabaseClient
                .from('ai_conversations')
                .select('messages')
                .eq('id', conversationId)
                .single()

            if (conversation) {
                messages = [...messages, ...conversation.messages]
            }
        }

        // Add new user message
        messages.push({ role: 'user', content: message })

        // Call OpenAI API
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-4-turbo-preview',
                messages: messages,
                temperature: 0.7,
                max_tokens: 1000,
            }),
        })

        const data = await openaiResponse.json()
        const assistantMessage = data.choices[0].message

        // Add assistant response to messages
        messages.push(assistantMessage)

        // Save conversation to database
        const conversationData = {
            user_id: user.id,
            messages: messages.slice(1), // Remove system message
            model: 'gpt-4-turbo',
            tokens_used: data.usage.total_tokens,
            provider: 'openai',
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
                response: assistantMessage.content,
                conversationId: savedConversationId,
                tokensUsed: data.usage.total_tokens,
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
