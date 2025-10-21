import { signIn } from "../services/index"
import { useState } from 'react'
import { AuthError } from "@supabase/supabase-js"

const useSignIn = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null> (null)

    const handleSignIn = async (email: string, password: string) => {
        setLoading(true)
        try {
            //console.log(email)
            //console.log(password)
            await signIn(email, password)
            setSuccess(true)
        } catch(error: unknown) {
            if(error instanceof AuthError) console.log(error.message)
            setErrorMessage("ログインエラー")
        } finally {
            setLoading(false)
        }

    }    

    return { handleSignIn, loading, errorMessage, success }
} 
export default useSignIn