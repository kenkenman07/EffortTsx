//import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import useGetSession from './hooks/useGetSession'
import SearchUsersPage from './pages/SearchUsersPage'
import SearchRequestsPage from './pages/SearchRequestsPage'
import SearchFriendsPage  from './pages/SearchFriendsPage'
import Layout from './Layout/Layout'

const ProtectedChildren = ()  => {
    const {user, loading} = useGetSession()
    if(loading) return <div>読み込み中...</div>
    if (!user) return <Navigate to="/" />
    return <Outlet/>
}


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/' element={<SignInPage />} />
                
                <Route element={<ProtectedChildren />} >
                    <Route element={<Layout />} >

                <Route path='/dash' element={<DashboardPage />} />
                <Route path='/searuser' element={<SearchUsersPage />} />
                <Route path='/searreq' element={<SearchRequestsPage />} />
                <Route path='/searfri' element={<SearchFriendsPage />} />

                    </Route>
                </Route>
                

            </Routes>


    
        
        </BrowserRouter>
    )
}
export default Router
