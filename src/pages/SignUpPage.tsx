import { useSignUp } from "../hooks/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
    const { handleSignUp, loading, errorMessage, success } = useSignUp()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(success) navigate("/")
    }, [success, navigate])

    return (
        <form onSubmit={(e) => {e.preventDefault(); handleSignUp(email, password)}} >
            <input value={email} placeholder="メールアドレス" onChange={(e) => setEmail(e.target.value)} />
            <input value={password} placeholder="パスワード" onChange={(e) => setPassword(e.target.value)} />

            <button disabled={loading}>
                {loading ? "登録中..." : "サインアップ"}
            </button>
            {success && <p>アカウントの登録が完了しました</p>}
            {errorMessage && <p>{errorMessage}</p>} 
        </form>
    )
}
export default SignUpPage