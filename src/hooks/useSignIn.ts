import { signIn, selectEmailByName } from "../services/index"
import { useState } from 'react'
//import { AuthError } from "@supabase/supabase-js"


const useSignIn = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null> (null)

    const handleSignIn = async (username: string, password: string) => {
        setLoading(true)
        let step: "signIn" | "select" = "select"
        try {
            const email = await selectEmailByName(username)
            if(!email) throw new Error("メールアドレスの取得に失敗")

            step = "signIn"
            await signIn(email, password)
            setSuccess(true)
        } catch(error: unknown) {
            if(step === "select") setErrorMessage("メールアドレスセレクトエラー")
            //if(error instanceof AuthError) console.log(error.message)
            else setErrorMessage("ログインエラー")
        } finally {
            setLoading(false)
        }

    }    

    return { handleSignIn, loading, errorMessage, success }
} 
export default useSignIn