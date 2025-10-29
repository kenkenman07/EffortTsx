import { useSignUp } from "../hooks/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { SignUpDesign } from "../design/pages/SignUpDesign";

const SignUpPage = () => {
    const { handleSignUp, loading, errorMessage, success } = useSignUp()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        if(success) navigate("/")
    }, [success, navigate])

    return (
        <>
        <SignUpDesign>

            <h1>アカウント登録ページ</h1>
            <form onSubmit={(e) => {e.preventDefault(); handleSignUp(email, password, username)}} >
                <input value={email} placeholder="メールアドレス" onChange={(e) => setEmail(e.target.value)} />
                <input value={password} placeholder="パスワード" onChange={(e) => setPassword(e.target.value)} />
                <input value={username} placeholder="名前" onChange={(e) => setUsername(e.target.value)} />

                <button disabled={loading}>
                    {loading ? "登録中..." : "サインアップ"}
                </button>
                {success && <p>アカウントの登録が完了しました</p>}
                {errorMessage && <p>{errorMessage}</p>} 
            </form>

            <button onClick={() => navigate("/")}>アカウント登録がお済である方はこちら</button>
        </SignUpDesign>
        </>
    )
}
export default SignUpPage