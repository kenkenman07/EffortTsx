import { supabase } from "./makeSupabase";

const getSession = async () => {
    const { data, error } = await supabase.auth.getSession()
    if(error) throw error
    return data.session
}
export default getSession