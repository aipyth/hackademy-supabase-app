import supabase from './supabase'

function makeDocPath(user_id) {
    return `private/${user_id}.jpg`
}

export default {
    async updateUserDoc({ file, user_id }) {
        const doc_path = makeDocPath(user_id)
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
        const doc_path = makeDocPath(user_id)
        const { data, error } = await supabase
            .storage
            .from('docs')
            .upload(doc_path, file)

        if (error) {
            console.error('error uploading user doc', error)
        }
        return { data, doc_path }
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
