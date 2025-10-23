import { useSignIn } from "../hooks/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    const { handleSignIn, loading, errorMessage, success } = useSignIn()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()

    useEffect(() => {
        if(success) navigate("/dash")
    }, [success, navigate])

    return (
        <>
        <h1>ログインページ</h1>
            <form onSubmit={(e) => {e.preventDefault(); handleSignIn(email, password)}} >
                <input value={email} placeholder="メールアドレス" onChange={(e) => setEmail(e.target.value)} />
                <input value={password} placeholder="パスワード" onChange={(e) => setPassword(e.target.value)} />

                <button disabled={loading}>
                    {loading ? "ログイン中" : "ログイン"}
                </button>
                
                {errorMessage && <p>{errorMessage}</p>} 
            </form>
            <button onClick={() => navigate("/signup")}>アカウント登録がまだの方はこちら</button>
        </>
    )
}
export default SignInPage