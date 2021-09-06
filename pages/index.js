import { useState } from "react"
import Layout from "../containers/Layout"
import { supabase, docs } from '../utils'
import '../styles/Home.module.sass'
import { Input, Button, Card } from '@supabase/ui'
import LogOutButton from '../containers/LogOutButton'
import Doc from "../components/Doc"

export default function KYC({ profile }) {
    const [phone, setPhone] = useState(profile?.phone || '')
    const [first_name, setFirstname] = useState(profile?.first_name || '')
    const [last_name, setLastname] = useState(profile?.last_name || '')
    const [country, setCountry] = useState(profile?.country || '')
    const [city, setCity] = useState(profile?.city || '')

    const saveData = async () => {
        const data = {
            phone,
            first_name,
            last_name,
            country,
            city,
        }
        const { user } = supabase.auth.session()
        const { error } = await supabase
            .from('profiles')
            .update(data)
            .match({ id: user.id })
        if (error) {
            console.error(error)
        }
    }

    console.log('profile doc', profile.doc_url)

    return (
        <Layout>
            <form className="kyc-form">
                <Input label="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
                <Input label="First name" value={first_name} onChange={e => setFirstname(e.target.value)} />
                <Input label="Last name" value={last_name} onChange={e => setLastname(e.target.value)} />
                <Input label="Country" value={country} onChange={e => setCountry(e.target.value)} />
                <Input label="City" value={city} onChange={e => setCity(e.target.value)} />
                <Doc doc_url={ profile?.doc_url } />
            </form>
            <Button block type="primary"
                    onClick={() => saveData()}
            >
                Save
            </Button>
            <LogOutButton redirect_to="/auth" />
        </Layout>
    )
}

async function getUserProfile({ user_id }) {
    const { data: profile, error } = await supabase
        .from('profiles')
        .select()
        .match({id: user_id})
        .single()
    if (error) {
        console.error(error)
    }
    if (Object.keys(profile).length === 0) {
        const { data: profile, error } = await supabase
            .from('profiles')
            .insert([
                { id: user.id },
            ])
        if (error) {
            console.error(error)
        }
        return profile
    }
    return profile
}

export async function getServerSideProps(context) {
    const { user } = await supabase.auth.api.getUserByCookie(context.req)
    if (!user) {
        return {
            redirect: {
                destination: '/auth',
                premanent: false,
            }
        }
    }

    const profile = await getUserProfile({ user_id: user.id })

    return {
        props: {
            profile: profile || null,
        }
    }
}

