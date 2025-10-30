import { getSession, insert, name_id } from "../services/index";
import type { Session } from "@supabase/supabase-js";
import { useState } from "react";

const sendFriendRequests = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    let step: 'session' | 'toId' | 'insert' = 'session'

    const handleSend = async (recvUname: string): Promise<void> => {
        setLoading(true)
        try{ 
            const session: (Session | null) = await getSession()
            const user = session?.user
            
            if(!user) { throw new Error("ログインしていない") }
            
            const sendUid: string = user?.id 
            
            step = 'toId'
            const recvUid: string = await name_id(recvUname, 'username', 'id')
            
            step = 'insert'

            await insert('friendRequests', { recv_uid: recvUid, send_uid: sendUid })

        } catch (error) {
            if(step === 'session') {setErrorMessage('セッション取得エラー')}
            else if(step === 'toId') {setErrorMessage('name-id変換エラー')}
            else if(step === 'insert') {setErrorMessage('insertエラー')}

        }finally {
            setLoading(false)
        }
    }

        return { handleSend, loading, errorMessage }

}
export default sendFriendRequests