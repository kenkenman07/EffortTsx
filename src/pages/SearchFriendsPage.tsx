import { searchFriends } from "../hooks/index"
//import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const SearchRequestsPage = () =>{
    const { handleSelectFriends, loading, errorMessage, users } = searchFriends()
    //const [username, setUsername] = useState("")
    //const [sentUsers, setSentUsers] = useState<string[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        handleSelectFriends(); 
    }, []);

    return (
        <>
            <h1>フレンド一覧</h1>
            

            {loading && <p>検索中...</p>}
        
            {errorMessage && <p>{errorMessage}</p>}

            
            {users.length > 0 && (
                <ul>
                {users.map((u, i) => (
                    <li key={i} >
                        {u}
                    </li>
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
export default SearchRequestsPage