import { selectOne } from "../services/index"
import { signIn } from "../services/auth"
import { useState } from 'react'
import type { SupabaseResponseOne } from "../types/db"

const useSignIn = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null> (null)

    const handleSignIn = async (username: string, password: string) => {
        setLoading(true)
        let step: "signIn" | "select" = "select"
        try {
            const data: SupabaseResponseOne['data'] = await selectOne({ 
                table: 'profiles',
                column: 'email', 
                eqKey: 'username',
                eqVal: username, 
            })

            const email = data?.email ?? null

            if(!email) throw new Error("メールアドレスの取得に失敗")

            step = "signIn"
            await signIn(email, password)
            setSuccess(true)
        } catch(error: unknown) {
            if(step === "select") setErrorMessage("メールアドレスセレクトエラー")
           
            else setErrorMessage("ログインエラー")
        } finally {
            setLoading(false)
        }

    }    

    return { handleSignIn, loading, errorMessage, success }
} 
export default useSignIn