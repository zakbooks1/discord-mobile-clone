import { createClient } from '@supabase/supabase-js'

// You get these two from your Supabase Project Settings
const supabaseUrl = 'https://dtizbwvmirwxbdsraarc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0aXpid3ZtaXJ3eGJkc3JhYXJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3NjM3MzYsImV4cCI6MjA4OTMzOTczNn0.CK4aG1Gr5Kez9oM-1_pZ67wYxsaItZhfLb5AD2UrxOk'

export const db = createClient(supabaseUrl, supabaseAnonKey)
