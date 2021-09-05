import { Card } from '@supabase/ui'
import { supabase, docs } from '../utils'
import { useEffect, useState } from 'react'

export default async function Doc({ doc_url }) {
    console.log('doc_url', doc_url)
    const docPath = await docs.getDocUrl(doc_url)
    console.log('docPath', docPath)
    const [docUrl, setDocUrl] = useState(docPath)

    console.log('docUrl', docUrl, doc_url, docPath)

    const saveDoc = async (e) => {
        const docFile = e.target.files[0]
        const { user } = supabase.auth.session()

        const func = docUrl ? docs.updateUserDoc : docs.uploadUserDoc
        const { doc_path: new_doc_path } = await func({ file: docFile, user_id: user.id })
        await docs.saveDocPath({ doc_path: new_doc_path, user_id: user.id})

        const new_doc_url = await docs.getDocUrl(new_doc_path)
        console.log("new_doc_url", new_doc_url)
        if (new_doc_url) {
            setDocUrl(new_doc_url)
        }
    }

    return (
        <>
            <Image src={docUrl} alt="Document picture"></Image>
            <input id="doc-file" type="file" name="doc-file" accept="image/jpg" onChange={(e) => saveDoc(e)}/>
        </>
    )
}
