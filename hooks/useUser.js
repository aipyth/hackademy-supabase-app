import { useEffect, useState } from 'react'
import { supabase } from '../utils'

export default function useUser() {
    const [user, setUser] = useState(supabase.auth.user())
    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange(() => {
            setUser(supabase.auth.user())
        })
        return () => {
            authListener.unsubscribe()
        }
    }, [])
    return user
}
