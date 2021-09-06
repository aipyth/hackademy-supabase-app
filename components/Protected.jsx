import useUser from '../hooks/useUser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Protected({ children }) {
    const user = useUser()
    const router = useRouter()
    
    useEffect(() => {
        if (router && !user) {
            router.push('/auth')
        }
    })

    return (
        <>
            { children }
        </>
    )
}
