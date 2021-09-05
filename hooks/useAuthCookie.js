import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { supabase } from '../utils'

export default function useAuthCookie({ redirect_to }) {
    const router = useRouter()

    useEffect(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            fetch('/api/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin',
                body: JSON.stringify({ event, session }),
            })
            router.push(redirect_to)
        })
        return () => {
            authListener.unsubscribe()
        }
    }, [])
}

