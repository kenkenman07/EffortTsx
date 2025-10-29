import { useEffect, useState } from "react"
import { setUsersStatus } from "../services/index"

const useSetOnlineStatus = (userId: string | null) => {
    const [errorMessage, setErrorMessage] = useState('')

    try { 

        useEffect(() => {
            if(!userId) return
            
            const setOnline = async () => setUsersStatus(userId, 'online')
            const setOffline = async () => setUsersStatus(userId, 'offline')
                        
            setOnline()
            window.addEventListener("beforeunload", setOffline)
            
            return () => {
                setOffline()
                window.removeEventListener("beforeunload", setOffline)
            }
            
        }, [userId])
    } catch (error) {
        setErrorMessage('statusの更新に失敗')

    }

    return errorMessage
    
}
export default useSetOnlineStatus