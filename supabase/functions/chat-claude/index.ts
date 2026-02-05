// Supabase Edge Function - Anthropic Claude
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
        const { message, conversationId } = await req.json()

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
        let messages = []

        if (conversationId) {
            const { data: conversation } = await supabaseClient
                .from('ai_conversations')
                .select('messages')
                .eq('id', conversationId)
                .single()

            if (conversation) {
                messages = conversation.messages
            }
        }

        // Add new user message
        messages.push({ role: 'user', content: message })

        // Call Anthropic Claude API
        const claudeResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': Deno.env.get('ANTHROPIC_API_KEY') ?? '',
                'anthropic-version': '2023-06-01',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'claude-3-5-sonnet-20241022',
                max_tokens: 1024,
                system: 'Tu es un assistant expert en football. Tu fournis des analyses détaillées sur les matchs, joueurs, tactiques et statistiques. Tu es particulièrement doué pour expliquer les stratégies complexes de manière simple.',
                messages: messages,
            }),
        })

        const data = await claudeResponse.json()

        if (!claudeResponse.ok) {
            throw new Error(data.error?.message || 'Claude API error')
        }

        const assistantMessage = {
            role: 'assistant',
            content: data.content[0].text,
        }

        messages.push(assistantMessage)

        // Save to database
        const conversationData = {
            user_id: user.id,
            messages: messages,
            model: 'claude-3-5-sonnet',
            tokens_used: data.usage.input_tokens + data.usage.output_tokens,
            provider: 'anthropic',
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
                tokensUsed: data.usage.input_tokens + data.usage.output_tokens,
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
