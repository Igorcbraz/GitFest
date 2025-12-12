'use client'
import { createClient, SupabaseClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string | undefined
const key = process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string | undefined

export const supabase: SupabaseClient | null = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null
export const hasSupabase = !!supabase
