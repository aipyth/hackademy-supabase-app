import { Card } from '@supabase/ui'
import { supabase, docs } from '../utils'
import { useState } from 'react'

export default function Doc() {
    const [uploaded, setUploaded] = useState(false)

    const saveDoc = async (e) => {
        const docFile = e.target.files[0]
        const { user } = supabase.auth.session()

        const uploadFunction = docUrl ? docs.updateUserDoc : docs.uploadUserDoc
        const { doc_path: new_doc_path } = await uploadFunction({ file: docFile, user_id: user.id })
        await docs.saveDocPath({ doc_path: new_doc_path, user_id: user.id})
        setUploaded(true)
    }

    return (
        <Card title={ uploaded ? "Document uploaded" : "Upload document" }>
            <input id="doc-file" type="file" name="doc-file" accept="image/jpg" onChange={(e) => saveDoc(e)}/>
        </Card>
    )
}
