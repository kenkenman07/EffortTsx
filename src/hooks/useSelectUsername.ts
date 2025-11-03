import { selectMany } from "../services/index";
import { getSession } from "../services/auth";
import { useState } from "react";
import type { UserFriendStatus } from "../types/Friends";
import { supabase } from "../services/makeSupabase";

const useSelectUsername = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [users, setUsers] = useState<UserFriendStatus[]>([])
    const [you_id, setYou_id] = useState<string>("")

    
    const handleSelectUser = async (username: string) => { 
        setLoading(true)

        const user_id: (string | null) = await getSession()
        if(!user_id) throw new Error("ユーザidがnullです")
        
        setYou_id(user_id)
        

        try {
            const data = await selectMany({ 
                table: 'profiles',
                column: 'id, username', 
                eqKey: 'username',
                eqVal: username, 
            })

            if(!data || data.length === 0) {
                setUsers([])
            }

            const { data: requests } = await supabase
                .from('friendRequests')
                .select('recv_uid, send_uid')
                .or(`recv_uid.eq.${you_id}, send_uid.eq.${you_id}`)

            const { data: friends } = await supabase
            .from('friends')
            .select('user_id, friends_id')
            .or(`user_id.eq.${you_id}, friends_id.eq.${you_id}`)

            const result: UserFriendStatus[] = data.map((p) => {
                const sentRequests = requests?.some(
                    (r) => r.send_uid === you_id && r.recv_uid === p.id
                )
            const isFriend = friends?.some(
                (f) => (f.user_id === you_id && f.friends_id === p.id) ||
                (f.user_id === p.id && f.friends_id === you_id)
            )

            return { id: p.id, username: p.username, sentRequests: !!sentRequests, isFriend: !!isFriend}
            })

            setUsers(result)

        } catch(error) {
            console.log(error)
            setErrorMessage("ユーザ検索エラー")
        } finally {
            setLoading(false)
        }

        
        
    }
    return {handleSelectUser, users, loading, errorMessage, you_id}
    
}
export default useSelectUsername