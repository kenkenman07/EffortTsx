import { supabase  } from "./makeSupabase";

const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if(error) throw error
}
export default signOut