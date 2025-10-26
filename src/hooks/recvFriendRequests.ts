import { selectMany, name_id, getSession } from "../services/index";
import type { Session } from "@supabase/supabase-js";
import { useState } from "react";

const recvFriendRequests = () => {
    const [users, setUsers] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    let step: 'session' | 'idToName' | 'select' = 'session'

    const handleRecv = async (): Promise<void> => {
        setLoading(true)

        try {

            const session: (Session | null) = await getSession()
            const user = session?.user
            
            if(!user) { throw new Error("ログインしていない") }
            
            const recvUid: string = user?.id 

            step = 'select'
            
            const data: Record<string, string>[] = await selectMany({ 
                table: 'friendRequests',
                column: 'send_uid', 
                eqKey: 'recv_uid',
                eqVal: recvUid, 
            })
            
            
            if (!data || data.length === 0) {
                setUsers([]);
            }
            
            step = 'idToName'

            //ここはGPTコピペ
            const names = await Promise.all(
                data.map(async (row) => {
                const uid = row.send_uid;
                const username = await name_id(uid, "id", "username");
                return username;
                })
            );
            setUsers(names);
        
        } catch (error) {
            if(step === 'session') {setErrorMessage('セッション取得エラー')}
            else if(step === 'idToName') {setErrorMessage('name-id変換エラー')}
            else if(step === 'select') {setErrorMessage('selectエラー')}

        } finally {
            setLoading(false)
        }
    }
    
    return { handleRecv, loading, errorMessage, users }
}
export default recvFriendRequests