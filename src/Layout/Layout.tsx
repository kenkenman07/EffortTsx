// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom"
import { useGetSession } from "../hooks"
import { usePresence } from "../hooks/index"   // ← 追加
import { name_id } from "../services"
import { useEffect, useState } from "react"
import type { PresenceUser } from "../types/realtime"

import { AppShell, FriendsPanel, type Friend } from "../design"
import { FireBackground } from "../design/app/FireBackground"


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

  const friends: Friend[] = onlineUsers.map((u) => ({
    id: u.userId,
    username: u.username,
    status: "online",
  }));

  console.log('onlineUsers:', onlineUsers)
  
    
  return (
    <div>

    <FireBackground/>

    <AppShell
      header={<div className="container">🔥 Effort Forest</div>}
      sidebar={<FriendsPanel friends={friends} />}
      >
      <main className="container">
        <Outlet />
      </main>
    </AppShell>
        </div>
  );

}

export default Layout
