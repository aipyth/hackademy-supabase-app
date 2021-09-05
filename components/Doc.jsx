import { Card } from '@supabase/ui'
import { supabase, docs } from '../utils'
import {useState} from 'react'

export default function Doc({ doc_url }) {
    const [docUrl, setDocUrl] = useState(doc_url)

    const saveDoc = async (e) => {
        const docFile = e.target.files[0]
        const { user } = supabase.auth.session()

        const func = docUrl ? docs.updateUserDoc : docs.uploadUserDoc
        const { doc_path: new_doc_path } = await func({ file: docFile, user_id: user.id })
        await docs.saveDocPath({ doc_path: new_doc_path, user_id: user.id})

        const new_doc_url = await docs.getDocUrl(new_doc_path)
        if (new_doc_url) {
            setDocUrl(signedUrl)
        }
    }

    return (
        <Card title="Document"
              cover={
                <img key="" src={docUrl}
                />
              }
        >
            <input id="doc-file" type="file" name="doc-file" accept="image/jpg" onChange={(e) => saveDoc(e)}/>

        </Card>

    )
}
