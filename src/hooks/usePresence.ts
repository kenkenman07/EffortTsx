// hooks/usePresence.ts
import { useEffect, useState, useRef } from "react"
import { subscribePresence, unsubscribePresence } from "../services/presenceService"
import type { PresenceUser } from "../types/realtime"
import { supabase } from "../services/makeSupabase"

const usePresence = (userId: string, username: string): { onlineUsers: PresenceUser[] } => {
  const [onlineUsers, setOnlineUsers] = useState<PresenceUser[]>([])
  const [friendIds, setFriendIds] = useState<string[]>([])

  const friendIdsRef = useRef<string[]>([]) 
  useEffect(() => { friendIdsRef.current = friendIds }, [friendIds])

  useEffect(() => {
    if (!userId) return
    const fetchFriendIds = async () => {
      const { data, error } = await supabase
        .from("friends")
        .select("user_id, friends_id")
        .or(`user_id.eq.${userId},friends_id.eq.${userId}`)

      if (error) return console.error("friend fetch error:", error)

      const ids = data.map((f) => (f.user_id === userId ? f.friends_id : f.user_id))
      setFriendIds(ids)
    }
    fetchFriendIds()
  }, [userId])

  useEffect(() => {
    if (!userId || !username) return

    const channel = subscribePresence(userId, username, (state) => {
      // presenceState()の構造を整形
      const friends = friendIdsRef.current
      const users: PresenceUser[] = Object.entries(state)
        .map(([userId, payloads]) => ({ userId, username: payloads[0]?.username }))
        .filter((u) => friends.includes(u.userId) || u.userId === userId)
      setOnlineUsers(users)
    })

    // ブラウザ閉じる前にuntrackする
    window.addEventListener("beforeunload", () => unsubscribePresence(channel))

    // cleanup
    return () => {
      unsubscribePresence(channel)
    }
  }, [userId, username])

  return { onlineUsers }
}
export default usePresence
