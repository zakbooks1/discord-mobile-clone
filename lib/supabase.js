import { createClient } from '@supabase/supabase-js'

// You get these two from your Supabase Project Settings
const supabaseUrl = 'https://your-project-id.supabase.co'
const supabaseAnonKey = 'YOUR_PUBLISHABLE_ANON_KEY'

export const db = createClient(supabaseUrl, supabaseAnonKey)
