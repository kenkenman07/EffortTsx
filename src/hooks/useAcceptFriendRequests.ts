import { insert, name_id } from "../services/index";
import { getSession } from "../services/auth";
import { useState } from "react";
import { supabase } from "../services/makeSupabase";

const useAcceptFriendRequests = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")

    let step: 'session' | 'toId' | 'insert' | 'delete' = 'session'

    const handleMakeFriends = async (sendUname: string): Promise<void> => {
        setLoading(true)
        try{ 
            const user_id: (string | null) = await getSession()
            
            if(!user_id) { throw new Error("ユーザidがnullです") }
            
            const recvUid: string = user_id
            
            step = 'toId'
            const sendUid: string = await name_id(sendUname, 'username', 'id')
            
            step = 'insert'

            await insert('friends', { user_id: recvUid, friends_id: sendUid })

            step = "delete";
            
            await supabase
                .from("friendRequests")
                .delete()
                .or(`send_uid.eq.${sendUid},recv_uid.eq.${recvUid}`);


        } catch (error) {
            if(step === 'session') {setErrorMessage('セッション取得エラー')}
            else if(step === 'toId') {setErrorMessage('name-id変換エラー')}
            else if(step === 'insert') {setErrorMessage('insertエラー')}
            else if(step === 'delete') {setErrorMessage('デリートエラー')}

        }finally {
            setLoading(false)
        }
    }

        return { handleMakeFriends, loading, errorMessage }

}
export default useAcceptFriendRequests