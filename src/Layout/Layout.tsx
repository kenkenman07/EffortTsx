// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom"
import { useGetSession } from "../hooks"
import { usePresence } from "../hooks/index"   // ← 追加
import { name_id } from "../services"
import { useEffect, useState } from "react"
import type { PresenceUser } from "../types/realtime"

import { LayoutWrapper } from "../design/components/LayoutWrapper";
import "../design/app/campThemeLite";



const Layout = () => {
  const [username, setUsername] = useState<string>('')
  const { user }  = useGetSession()

  const user_id: (string | null) = user

  useEffect (() => {
    if(!user_id) return
    let didCancel = false
    const fetchName = async () => {


      const name = await name_id(user_id, 'id', 'username')
      if(!didCancel)setUsername(name)
    }
    fetchName()

    return () => {
      didCancel = true
    }

  }, [user_id])

  const { onlineUsers }: { onlineUsers: PresenceUser[] } = usePresence(user_id ?? "", username ?? "") 
 
    
  return (
    <LayoutWrapper>

    <div> 

    
    {onlineUsers.length === 0 && <p>オンラインのユーザがいません</p>}
    {onlineUsers.length > 0 && onlineUsers.map((user) => (
      user_id === user.userId ? (
        <p key={user.userId}>{user.username} (あなた)</p>
      ) : ( 
        <p key={user.userId}>{user.username}</p>
      )
      
    ))}
    
      <main>
        <Outlet />
      </main>
    
        </div>
    </LayoutWrapper>
  );

}

export default Layout
