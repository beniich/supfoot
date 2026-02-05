// Client TypeScript pour interagir avec les 3 LLMs via Supabase
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type LLMProvider = 'openai' | 'anthropic' | 'google'

export interface ChatMessage {
    role: 'user' | 'assistant'
    content: string
}

export interface ChatResponse {
    response: string
    conversationId: string
    tokensUsed: number
}

/**
 * Envoie un message à OpenAI GPT-4
 */
export async function chatWithOpenAI(
    message: string,
    conversationId?: string
): Promise<ChatResponse> {
    const { data, error } = await supabase.functions.invoke('chat-openai', {
        body: { message, conversationId },
    })

    if (error) throw error
    return data
}

/**
 * Envoie un message à Anthropic Claude
 */
export async function chatWithClaude(
    message: string,
    conversationId?: string
): Promise<ChatResponse> {
    const { data, error } = await supabase.functions.invoke('chat-claude', {
        body: { message, conversationId },
    })

    if (error) throw error
    return data
}

/**
 * Envoie un message à Google Gemini (avec support d'images)
 */
export async function chatWithGemini(
    message: string,
    conversationId?: string,
    imageUrl?: string
): Promise<ChatResponse> {
    const { data, error } = await supabase.functions.invoke('chat-gemini', {
        body: { message, conversationId, imageUrl },
    })

    if (error) throw error
    return data
}

/**
 * Fonction universelle pour chatter avec n'importe quel LLM
 */
export async function chatWithLLM(
    provider: LLMProvider,
    message: string,
    conversationId?: string,
    imageUrl?: string
): Promise<ChatResponse> {
    switch (provider) {
        case 'openai':
            return chatWithOpenAI(message, conversationId)
        case 'anthropic':
            return chatWithClaude(message, conversationId)
        case 'google':
            return chatWithGemini(message, conversationId, imageUrl)
        default:
            throw new Error(`Provider ${provider} not supported`)
    }
}

/**
 * Récupère l'historique des conversations d'un utilisateur
 */
export async function getConversations(provider?: LLMProvider) {
    let query = supabase
        .from('ai_conversations')
        .select('*')
        .order('updated_at', { ascending: false })

    if (provider) {
        query = query.eq('provider', provider)
    }

    const { data, error } = await query

    if (error) throw error
    return data
}

/**
 * Récupère une conversation spécifique
 */
export async function getConversation(conversationId: string) {
    const { data, error } = await supabase
        .from('ai_conversations')
        .select('*')
        .eq('id', conversationId)
        .single()

    if (error) throw error
    return data
}

/**
 * Supprime une conversation
 */
export async function deleteConversation(conversationId: string) {
    const { error } = await supabase
        .from('ai_conversations')
        .delete()
        .eq('id', conversationId)

    if (error) throw error
}

/**
 * Récupère les statistiques d'utilisation
 */
export async function getUsageStats(startDate?: Date, endDate?: Date) {
    let query = supabase
        .from('ai_usage_stats')
        .select('*')
        .order('created_at', { ascending: false })

    if (startDate) {
        query = query.gte('created_at', startDate.toISOString())
    }
    if (endDate) {
        query = query.lte('created_at', endDate.toISOString())
    }

    const { data, error } = await query

    if (error) throw error
    return data
}
