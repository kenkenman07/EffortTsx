import { supabase } from "./makeSupabase";

const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if(error) throw error
    return data
}
export default signUp


