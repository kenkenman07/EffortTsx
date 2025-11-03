import { useSearchFriends } from "../hooks/index"
//import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const SearchRequestsPage = () =>{
    const { handleSelectFriends, loading, errorMessage, friends } = useSearchFriends()
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

            
            {friends.length > 0 && (
                <ul>
                {friends.map((i) => (
                    <li key={i.friendId} >
                        {i.friendName}
                    </li>
                ))}
                </ul>

            )} 

            {!loading && friends.length === 0 && !errorMessage && (
                <p>ユーザが見つかりません</p>
            )}

            <button onClick={() => navigate('/dash')}>ダッシュボードページ</button>


        </>
    )
}
export default SearchRequestsPage