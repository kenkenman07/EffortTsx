import { insert, name_id } from "../services/index";
import { getSession } from "../services/auth";
import { useState } from "react";

const useSendFriendRequests = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    let step: 'session' | 'toId' | 'insert' = 'session'

    const handleSend = async (recvUname: string): Promise<void> => {
        setLoading(true)
        try{ 
            const user_id: (string | null) = await getSession()
    
            
            if(!user_id) { throw new Error("ユーザidがnullです") }
            
            const sendUid: string = user_id 
            
            step = 'toId'
            const recvUid: string = await name_id(recvUname, 'username', 'id')
            
            step = 'insert'

            await insert('friendRequests', { recv_uid: recvUid, send_uid: sendUid })

        } catch (error) {
            console.log(error)

            if(step === 'session') {setErrorMessage('セッション取得エラー')}
            else if(step === 'toId') {setErrorMessage('name-id変換エラー')}
            else if(step === 'insert') {setErrorMessage('insertエラー')}

        }finally {
            setLoading(false)
        }
    }

        return { handleSend, loading, errorMessage }

}
export default useSendFriendRequests