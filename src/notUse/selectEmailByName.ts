/**
 * 
import { supabase } from "./makeSupabase";

const selectEmailByName = async (username: string) => {
    const { data, error } = await supabase
    .from('profiles')
    .select('email')
    .eq('username', username)
    .single()
    
    if(error) throw error
    
    return data?.email ?? null
}
export default selectEmailByName
*/