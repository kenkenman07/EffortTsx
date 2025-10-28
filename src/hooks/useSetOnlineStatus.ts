import { useEffect } from "react"
import { setUsersStatus } from "../services/index"

const useSetOnlineStatus = (userId: string | null) => {
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
    
}
export default useSetOnlineStatus