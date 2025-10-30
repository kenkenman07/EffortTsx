import { getSession, insert, name_id } from "../services/index";
import type { Session } from "@supabase/supabase-js";
import { useState } from "react";

const makeFriends = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    let step: 'session' | 'toId' | 'insert' = 'session'

    const handleMakeFriends = async (sendUname: string): Promise<void> => {
        setLoading(true)
        try{ 
            const session: (Session | null) = await getSession()
            const user = session?.user
            
            if(!user) { throw new Error("ログインしていない") }
            
            const recvUid: string = user?.id 
            
            step = 'toId'
            const sendUid: string = await name_id(sendUname, 'username', 'id')
            
            step = 'insert'

            await insert('friends', { user_id: recvUid, friends_id: sendUid })

        } catch (error) {
            if(step === 'session') {setErrorMessage('セッション取得エラー')}
            else if(step === 'toId') {setErrorMessage('name-id変換エラー')}
            else if(step === 'insert') {setErrorMessage('insertエラー')}

        }finally {
            setLoading(false)
        }
    }

        return { handleMakeFriends, loading, errorMessage }

}
export default makeFriends