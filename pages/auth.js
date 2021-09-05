import { Auth, Typography, Button, Input, IconMail } from '@supabase/ui'

import { supabase } from '../utils'
import Layout from '../containers/Layout'
import useAuthCookie from '../hooks/useAuthCookie'
// import AuthProviders from '../containers/AuthProviders'

export default function AuthBasic() {
    useAuthCookie({ redirect_to: '/' })

    return (
        <Layout>
            <Auth.UserContextProvider supabaseClient={supabase}>
                <Auth supabaseClient={supabase}
                      providers={['google']}
                />
            </Auth.UserContextProvider>
        </Layout>
    )
}

// export default function AuthBasic() {
//     const [isSignIn, setIsSignIn] = useState(false)
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [error, setError] = useState(null)

//     const signTypeText = isSignIn ? "Sign In" : "Sign Up"
//     const authProviders = ['google']

//     const sign = async (e) => {
//         e.preventDefault()
//         const authFunc = isSignIn ? supabase.auth.signIn : supabase.auth.signUp

//         const { user, session, error } = await authFunc({
//             email,
//             password,
//         })
//         console.log(user, session, error)
//         if (error) {
//             setError(error.message)
//         } else {
//             router.push('/')
//         }
//     }

//     return (
//         <Layout>
//             <Typography.Title level={3}>{ signTypeText } with</Typography.Title>
//             <AuthProviders providers={authProviders} />

//             <form className="sign-form">
//                 <Typography.Title level={3}>{ signTypeText }</Typography.Title>
//                 <Input label="Email"
//                        type="email"
//                        icon={<IconMail/>}
//                        value={email}
//                        onChange={(e) => setEmail(e.target.value)}
//                        error={error}
//                 />
//                 <Input label="Password"
//                        type="password"
//                        value={password}
//                        onChange={(e) => setPassword(e.target.value)}
//                        error={error}
//                 />

//                 <Button block type="primary" onClick={sign}>{ signTypeText }</Button>
//             </form>
            
//             <Button block type="default" onClick={() => setIsSignIn(!isSignIn)}>
//                 { isSignIn ? "Don't have an account? Sign up!" : "Already have an account? Sign in!" }
//             </Button>
//         </Layout>
//     )
// }

export async function getServerSideProps({ req }) {
    const { user } = await supabase.auth.api.getUserByCookie(req)
    if (user) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}
