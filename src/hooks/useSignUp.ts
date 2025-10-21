import { AuthError } from "@supabase/supabase-js"
import { signUp } from "../services/index"
import { useState } from "react"

const useSignUp = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null> (null)

    const handleSignUp = async (email: string, password: string) => {
        setLoading(true)
        try {
            console.log(email)
            console.log(password)
            await signUp(email, password)
            setSuccess(true)
        } catch(error: unknown) {
            if(error instanceof AuthError) console.log(error.message)
            setErrorMessage("アカウント登録エラー")
        } finally {
            setLoading(false)
        }

    }    

    return { handleSignUp, loading, errorMessage, success }
}
export default useSignUp