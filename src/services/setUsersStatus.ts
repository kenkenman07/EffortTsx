import type { PostgrestError } from "@supabase/supabase-js";
import { supabase } from "./makeSupabase";

const setUsersStatus = async (userId: string, status: 'online' | 'offline'): Promise<void> => {

    console.log('user_id:', userId, 'status', status)

    const { error }: { error: PostgrestError | null } = await supabase
        .from('profiles')
        .update({status})
        .eq('id', userId)

    if(error) throw error

} 
export default setUsersStatus