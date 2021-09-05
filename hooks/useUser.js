import { useEffect, useState } from 'react'
import { supabase } from '../utils'

export default function useUser() {
    const [user, setUser] = useState(supabase.auth.user())
    // useEffect(() => {
    //     supabase.auth.onAuthStateChange(() => {
    //         setUser(supabase.auth.user())
    //     })
    // })
    supabase.auth.onAuthStateChange(() => {
        setUser(supabase.auth.user())
    })
    return user
}
