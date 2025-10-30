//import type { PostgrestResponse } from "@supabase/supabase-js";
import { selectMany } from "../services/index";
import { useState } from "react";
import type { UserFriendStatus } from "../types/Friends";
import useGetSession from "./useGetSession";
import { supabase } from "../services/makeSupabase";

const useSelectUsername = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [users, setUsers] = useState<UserFriendStatus[]>([])

    const { user: you } = useGetSession()
    const you_id = you?.id

    const handleSelectUser = async (username: string) => {
        if(!you_id) return
        setLoading(true)
        

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
            setErrorMessage("ユーザ検索エラー")
        } finally {
            setLoading(false)
        }

        
        
    }
    return {handleSelectUser, users, loading, errorMessage, you_id}
    
}
export default useSelectUsername