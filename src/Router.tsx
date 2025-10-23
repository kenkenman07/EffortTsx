//import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'
import useGetSession from './hooks/useGetSession'

const ProtectedChildren = (props: {children: React.ReactNode})  => {
    const {user, loading} = useGetSession()
    if(loading) return <div>読み込み中...</div>
    return user ? props.children : <Navigate to="/" />
    
}


const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/' element={<SignInPage />} />
                <Route 
                    path='/dash' 
                    element={
                        <ProtectedChildren>
                            <DashboardPage /> 
                        </ProtectedChildren>
                    } 
                />

            </Routes>
        

    
        
        </BrowserRouter>
    )
}
export default Router
