import { signIn, selectOne } from "../services/index"
import { useState } from 'react'
import type { SupabaseResponseOne } from "../types/db"
//import { AuthError } from "@supabase/supabase-js"


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

            console.log("typeof email:", typeof email, "value:", email);

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