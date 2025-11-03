import { signUp } from "../services/auth"
import { insert } from "../services/index"
import { useState } from "react"

const useSignUp = () => {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [errorMessage, setErrorMessage] = useState<string | null> (null)

    const handleSignUp = async (email: string, password: string, username: string) => {
        setLoading(true)
        let step:  "signUp" | "insert" = "signUp" 

        try {
            const user_id: (string | null)  = await signUp(email, password)
            
            if(!user_id) throw new Error("ユーザidがnullです")
            
            step = "insert" 
            await insert('profiles', { id: user_id, username, email })
            
            setSuccess(true)
        } catch(error: unknown) {
            if(step === "signUp") {
                console.log(error)
                setErrorMessage("アカウント登録エラー")
            } else {
                setErrorMessage("ユーザ情報登録エラー")
            }
        } finally {
            setLoading(false)
        }


         
        

    }    

    return { handleSignUp, loading, errorMessage, success }
}
export default useSignUp