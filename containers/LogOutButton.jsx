import { supabase } from '../utils'
import { Button } from '@supabase/ui'
import useAuthCookie from '../hooks/useAuthCookie'

export default function LogOutButton({ redirect_to }) {
    useAuthCookie({ redirect_to })
    return (
        <Button block type="default"
                onClick={() => supabase.auth.signOut()}
        >
            Log Out
        </Button>
    )
}
