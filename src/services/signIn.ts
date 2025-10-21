import { supabase } from "./makeSupabase"

const signIn = async (email: string, password: string) => {
    const{ data, error } = await supabase.auth.signInWithPassword({ email, password })
    if(error) return error
    return data
}
export default signIn
