import { supabase } from "./makeSupabase";
import type { Session } from "@supabase/supabase-js";

const getSession = async (): Promise<Session | null> => {
    const { data, error } = await supabase.auth.getSession()
    if(error) throw error
    return data.session
}
export default getSession