import { supabase } from '../../utils'

export default function auth(req, res) {
    supabase.auth.api.setAuthCookie(req, res)
}
