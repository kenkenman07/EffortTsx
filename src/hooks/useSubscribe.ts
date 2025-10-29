import { subscribeToStatus, unsubscribeToStatus } from "../services/index"
import { useEffect, useState } from "react"
import type { Profile } from "../types/db"
import type { RealtimeChannel } from "@supabase/supabase-js"

const useSubscribe = (): {friends: Profile[]; errorMessage: string} => {
    const [friends, setFriends] = useState<Profile[]>([]) 
    const [errorMessage, setErrorMessage] = useState('')

    

        useEffect(() => {
            let channel: RealtimeChannel | null = null

            const init = async () => {
                try {
    
                    channel = await subscribeToStatus(({ id, status }) => {
                        //chatGPT丸写しだから分からない↓
                        setFriends(prev => prev.map((f) => (f.id === id ? { ...f, status } : f)))
                })
                        
                        console.log('channel:', channel)
                        
                    

                } catch(error) {
                    setErrorMessage('購読失敗')
                }    
            }

            init()
        
            return (() => {
            if(channel) {
                unsubscribeToStatus(channel)
            }
            })

        }, [])
    
   
    return  { friends, errorMessage } 
    
}
export default useSubscribe