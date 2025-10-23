import { supabase } from "./makeSupabase";


const insertUsername = async (id: string, username: string, email: string) => {
    const { error } = await supabase
        .from('profiles')
        .insert([{ id, username, email}])

    if(error) throw error
}
export default insertUsername