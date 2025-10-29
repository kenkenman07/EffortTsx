// hooks/usePresence.ts
import { useEffect, useState } from "react"
import { subscribePresence, unsubscribePresence } from "../services/presenceService"
import type { PresenceUser } from "../types/realtime"

export const usePresence = (userId: string, username: string): { onlineUsers: PresenceUser[] } => {
  const [onlineUsers, setOnlineUsers] = useState<PresenceUser[]>([])

  useEffect(() => {
    if (!userId || !username) return

    const channel = subscribePresence(userId, username, (state) => {
      // presenceState()の構造を整形
      const users: PresenceUser[] = Object.entries(state)
        .map(([userId, payloads]) => ({ userId, username: payloads[0]?.username }))
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
