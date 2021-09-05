import supabase from './supabase'

const DOC_URL_EXPIRE = 60

function makeDocPath(user_id) {

}

export default {
    async updateUserDoc({ file, user_id }) {
        const doc_path = `private/${user_id}.jpg`
        const { data, error } = await supabase
            .storage
            .from('docs')
            .update(doc_path, file)

        if (error) {
            console.error('error updating user doc', error)
        }
        return { data, doc_path }
    },
    async uploadUserDoc({ file, user_id }) {
        const doc_path = `private/${user_id}.jpg`
        const { data, error } = await supabase
            .storage
            .from('docs')
            .upload(doc_path, file)

        if (error) {
            console.error('error uploading user doc', error)
        }
        return { data, doc_path }
    },
    async getDocUrl(doc_path) {
        console.log('GetDocUrl input', doc_path)
        const p = await supabase
            .storage
            .from('docs')
            .createSignedUrl(doc_path, DOC_URL_EXPIRE)
        console.log('p',p)
        // if (error) {
        //     console.error('error getting user doc', error)
        // } else {
        //     console.log('signedUrl', signedUrl)
        //     return signedUrl
        // }
    },
    async saveDocPath({ doc_path, user_id }) {
        console.log(user_id, doc_path)
        const { error } = supabase
            .from('profiles')
            .update({ doc_url: doc_path })
            .match({ id: user_id })
        if (error) {
            console.error('error saving user doc to db', error)
        }
    },
}
