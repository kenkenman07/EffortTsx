//import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import SignUpPage from './pages/SignUpPage'
import SignInPage from './pages/SignInPage'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<SignUpPage />} />
                <Route path='/' element={<SignInPage />} />
                <Route path='/dash' element={<DashboardPage />} />

            </Routes>
        
        </BrowserRouter>
    )
}
export default Router
