import Head from 'next/head'

export default function Layout({ children, title }) {
    return (
        <>
            <Head>
                <title>{ title ? title : "Hackademy Supabase App" }</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <main>
                { children }
            </main>
        </>
    )
}
