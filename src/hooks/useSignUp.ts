//import { AuthError } from "@supabase/supabase-js"
import { signUp } from "../services/index"
import { insertUsername } from "../services/index"
import { useState } from "react"

const useSignUp = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null> (null)

    const handleSignUp = async (email: string, password: string, username: string) => {
        setLoading(true)
        let step:  "signUp" | "insert" = "signUp" 

        try {
            const data  = await signUp(email, password)
            
            const userId = data.user?.id
            if(!userId) throw new Error("ユーザID取得失敗")
            
            step = "insert" 
            await insertUsername(userId, username, email)
            
            setSuccess(true)
        } catch(error: unknown) {
            if(step === "signUp") {
                //if(error instanceof AuthError) console.log(error.message)
                setErrorMessage("アカウント登録エラー")
            } else {
                //if(error instanceof AuthError) console.log(error.message)
                setErrorMessage("ユーザ情報登録エラー")
            }
        } finally {
            setLoading(false)
        }


         
        

    }    

    return { handleSignUp, loading, errorMessage, success }
}
export default useSignUp