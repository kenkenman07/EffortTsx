import { supabase } from "./makeSupabase";

const selectUsernameByName = async (username: string) => {
    const { data, error } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", username)

    if(error) throw error

    return data?.map(item => item.username) ?? []
}
export default selectUsernameByName