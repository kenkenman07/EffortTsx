// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom"
import { useGetSession } from "../hooks"
import { usePresence } from "../hooks/usePresence"   // ← 追加
import { name_id } from "../services"
import { useEffect, useState } from "react"
import type { PresenceUser } from "../types/realtime"

const Layout = () => {
  const [username, setUsername] = useState<string>('')
  const { user } = useGetSession()
  const userId = user?.id

  useEffect (() => {
    if(!userId) return
    let didCancel = false
    const fetchName = async () => {


      const name = await name_id(userId, 'id', 'username')
      if(!didCancel)setUsername(name)
    }
    fetchName()

    return () => {
      didCancel = true
    }

  }, [userId])

  const { onlineUsers }: { onlineUsers: PresenceUser[] } = usePresence(userId ?? "", username ?? "") 

  console.log('onlineUsers:', onlineUsers)
  
    
  return (
    <div>
      <header>
        <h2>presence</h2>
        {onlineUsers.length === 0 && <p>オンラインのユーザがいません</p>}
        {onlineUsers.length > 0 && onlineUsers.map((user) => (
          <p key={user.userId}>{user.username}</p>
        ))}

        
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
