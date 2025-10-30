//import type { PostgrestResponse } from "@supabase/supabase-js";
import { getSession, name_id } from "../services/index";
import { useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../services/makeSupabase";
import type { Friends } from "../types/Friends";

const searchFriends = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [friends, setFriends] = useState<Friends[]>([])
   
    let step: 'session' | 'idToName' | 'select' = 'session'
    
    const handleSelectFriends = async () => {
        setLoading(true)
        
        try {
            const session: (Session | null) = await getSession()
            const user = session?.user
            
                
            if(!user) { throw new Error("ログインしていない") }
            
            const userId: string = user?.id 
            
            step = 'select'
           
            const { data, error } = await supabase
            .from("friends")
            .select("user_id, friends_id")
            .or(`user_id.eq.${userId},friends_id.eq.${userId}`)
            
            if(error) throw error
            if(!data) return setFriends([])
                
            const friendIds = data.map((f) => f.user_id === userId ? f.friends_id : f.user_id );

            step = 'idToName'        
            const result: Friends[] = await Promise.all(
                friendIds.map(async (fid) => {
                    const username = await name_id(fid, "id", "username");
                    return { friendId: fid, friendName: username}
                })
            );
            setFriends(result)           
            
            } catch(error) {
            if(step === 'session') {setErrorMessage('セッション取得エラー')}
            else if(step === 'idToName') {setErrorMessage('name-id変換エラー')}
            else if(step === 'select') {setErrorMessage('selectエラー')}
            
        } finally {
            setLoading(false)
        }         
        
        
    }
    return {handleSelectFriends, friends, loading, errorMessage}
    
}
export default searchFriends