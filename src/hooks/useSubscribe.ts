import { subscribeToStatus, unsubscribeToStatus } from "../services/index"
import { useEffect, useState } from "react"
import type { Profile } from "../types/db"
import type { RealtimeChannel } from "@supabase/supabase-js"

const useSubscribe = (): Profile[] => {
    const [friends, setFriends] = useState<Profile[]>([]) 

    useEffect(() => {
        const channel: RealtimeChannel = subscribeToStatus(({ id, status }) => {
            //chatGPT丸写しだから分からない↓
            setFriends(prev => prev.map((f) => (f.id === id ? { ...f, status } : f))
            
            )
        })
        return (() => {
                unsubscribeToStatus(channel)
        })
    }, [])
    
    return friends
    
}
export default useSubscribe