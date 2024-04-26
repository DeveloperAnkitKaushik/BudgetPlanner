
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ztwuauvlgutgvcvlvooc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0d3VhdXZsZ3V0Z3Zjdmx2b29jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM1MjM3NzYsImV4cCI6MjAyOTA5OTc3Nn0.5WIoBM2lsKs-uSk1Yg2Kk3HfEVaS4JCO4jr1kF7enLk'

export const supabase = createClient(
    supabaseUrl,
    supabaseKey
);