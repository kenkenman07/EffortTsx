//import type { PostgrestResponse } from "@supabase/supabase-js";
import { selectMany } from "../services/index";
import { useState } from "react";

const useSelectUsername = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [users, setUsers] = useState<string[]>([])

    const handleSelectUser = async (username: string) => {
        setLoading(true)

        try {
            const data: Record<string, string>[]  | null = await selectMany({ 
                table: 'profiles',
                column: 'username', 
                eqKey: 'username',
                eqVal: username, 
            })

            if(data && data.length > 0) {
                setUsers(data.map(row => row.username))
            } else {
                setUsers([])
            }

        } catch(error) {
            setErrorMessage("ユーザ検索エラー")
        } finally {
            setLoading(false)
        }

        
        
    }
    return {handleSelectUser, users, loading, errorMessage}
    
}
export default useSelectUsername