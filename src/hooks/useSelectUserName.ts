import { selectUsernameByName } from "../services/index";
import { useState } from "react";

const useSelectUsername = () => {
    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [users, setUsers] = useState<string[]>([])

    const handleSelectUser = async (username: string) => {
        setLoading(true)

        try {
            const data = await selectUsernameByName(username)
            setUsers(data)

        } catch(error) {
            setErrorMessage("ユーザ検索エラー")
        } finally {
            setLoading(false)
        }

        
        
    }
    return {handleSelectUser, users, loading, errorMessage}
    
}
export default useSelectUsername