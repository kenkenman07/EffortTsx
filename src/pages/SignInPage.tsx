import { useSignIn } from "../hooks/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LoginDesign } from "../design/pages/LoginDesign";

const SignInPage = () => {
    const { handleSignIn, loading, errorMessage, success } = useSignIn()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    const navigate = useNavigate()

    useEffect(() => {
        if(success) navigate("/dash")
    }, [success, navigate])

    return (
        <>
        <LoginDesign>

        <h1>ログインページ</h1>
            <form onSubmit={(e) => {e.preventDefault(); handleSignIn(username, password)}} >
                <input value={username} placeholder="名前" onChange={(e) => setUsername(e.target.value)} />
                <input value={password} placeholder="パスワード" onChange={(e) => setPassword(e.target.value)} />

                <button disabled={loading}>
                    {loading ? "ログイン中" : "ログイン"}
                </button>
                
                {errorMessage && <p>{errorMessage}</p>} 
            </form>
            <button onClick={() => navigate("/signup")}>アカウント登録がまだの方はこちら</button>
        </LoginDesign>
        </>
    )
}
export default SignInPage