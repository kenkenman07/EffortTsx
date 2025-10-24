import { useSelectUsername } from "../hooks/index"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchUsersPage = () =>{
    const { handleSelectUser, users, loading, errorMessage } = useSelectUsername()
    const [username, setUsername] = useState("")
    const navigate = useNavigate()

    return (
        <>
            <h1>ユーザ検索ページ</h1>
            <form onSubmit={(e) => {e.preventDefault(); handleSelectUser(username)}} >
                <input value={username} placeholder="名前" onChange={(e) => setUsername(e.target.value)} />
                <button type="submit">検索</button>
            </form>

            {loading && <p>検索中...</p>}
        
            {errorMessage && <p>{errorMessage}</p>}

            
            {users.length > 0 && (
                <ul>
                {users.map((u, i) => (
                    <li key={i}>{u}</li>
                ))}
                </ul>
            )} 
            {!loading && users.length === 0 && !errorMessage && (
                <p>ユーザが見つかりません</p>
            )}

            <button onClick={() => navigate('/dash')}>ダッシュボードページ</button>


        </>
    )
}
export default SearchUsersPage