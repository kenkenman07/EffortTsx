// hooks/usePresence.ts
import { useEffect, useState } from "react"
import { subscribePresence, unsubscribePresence } from "../services/presenceService"

type PresenceUser = {
  user_id: string
  online_at: string
}

export const usePresence = (userId: string) => {
  const [onlineUsers, setOnlineUsers] = useState<PresenceUser[]>([])

  useEffect(() => {
    if (!userId) return

    const channel = subscribePresence(userId, (state) => {
      // presenceState()の構造を整形
      const users: PresenceUser[] = Object.values(state)
        .flat()
        .map((p: any) => ({ user_id: p.user_id, online_at: p.online_at }))
      setOnlineUsers(users)
    })

    // ブラウザ閉じる前にuntrackする
    window.addEventListener("beforeunload", () => unsubscribePresence(channel))

    // cleanup
    return () => {
      unsubscribePresence(channel)
    }
  }, [userId])

  return { onlineUsers }
}
