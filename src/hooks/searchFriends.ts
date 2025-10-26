//import type { PostgrestResponse } from "@supabase/supabase-js";
import { selectMany, getSession, name_id } from "../services/index";
import { useState } from "react";
import type { Session } from "@supabase/supabase-js";

const searchFriends = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [users, setUsers] = useState<string[]>([])

    let step: 'session' | 'idToName' | 'select' = 'session'

    const handleSelectFriends = async () => {
        setLoading(true)

        try {

            const session: (Session | null) = await getSession()
            const user = session?.user
            
            if(!user) { throw new Error("ログインしていない") }
            
            const userId: string = user?.id 

            step = 'select'
            const data: Record<string, string>[]  | null = await selectMany({ 
                table: 'friends',
                column: 'friends_id', 
                eqKey: 'user_id',
                eqVal: userId, 
            })

            step = 'idToName'

            //ここはGPTコピペ
            const names = await Promise.all(
                data.map(async (row) => {
                const uid = row.friends_id;
                const username = await name_id(uid, "id", "username");
                return username;
                })
            );
            setUsers(names);

        } catch(error) {
            if(step === 'session') {setErrorMessage('セッション取得エラー')}
            else if(step === 'idToName') {setErrorMessage('name-id変換エラー')}
            else if(step === 'select') {setErrorMessage('selectエラー')}

        } finally {
            setLoading(false)
        }

        
        
    }
    return {handleSelectFriends, users, loading, errorMessage}
    
}
export default searchFriends