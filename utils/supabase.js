import { createClient } from '@supabase/supabase-js'

const NEXT_APP_URL = process.env.NEXT_PUBLIC_SUPABASE_APP_URL
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY

const supabase = createClient(NEXT_APP_URL, KEY)

export default supabase
