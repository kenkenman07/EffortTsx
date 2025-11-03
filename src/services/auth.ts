import { supabase } from "./makeSupabase";

export const signUp = async (email: string, password: string): Promise<string | null> => {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if(error) throw error

    if(!data.user) return null

    const user_id: string = data.user.id

    return user_id
}

export const signIn = async (email: string, password: string) => {
    const{ error } = await supabase.auth.signInWithPassword({ email, password })
    if(error) throw error

}

export const getSession = async (): Promise<string | null> => {
    const { data, error } = await supabase.auth.getSession()
    if(error) throw error

    if(!data.session) return null
    
    const user_id = data.session.user.id 

    return user_id
}


export const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if(error) throw error
}

