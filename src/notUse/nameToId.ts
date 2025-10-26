/**
 * 
import { supabase } from "./makeSupabase";

const nameToId = async (name: string) => {
    const { data, error } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', name)
    .single()
    
    if(error) throw error
    
    return data.id
}

export default nameToId
*/