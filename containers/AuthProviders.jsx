import { Button } from '@supabase/ui'
import { supabase } from '../utils'

export default function AuthProviders({ providers }) {
    const authWithProvider = (provider) => {
        supabase.auth.signIn({
            provider,
        })
    }
    const providersItems = providers.map(provider => <Button block type="outline" key={provider} onClick={() => authWithProvider(provider)}>{ provider }</Button>)
    return (
        <>
            { providersItems }
        </>
    )
}
