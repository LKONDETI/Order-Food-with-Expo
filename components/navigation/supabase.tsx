
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://ndgoayilwbgxzgyzoxxl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kZ29heWlsd2JneHpneXpveHhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIwMjkxOTAsImV4cCI6MjAzNzYwNTE5MH0.-d4DO3UN16hQW6eWWDBYC1QaTlPnZ9CtPwcooCG2wms'
 
 export const supabase = createClient(supabaseUrl, supabaseKey)