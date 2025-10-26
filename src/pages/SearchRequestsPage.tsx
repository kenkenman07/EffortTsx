import { recvFriendRequests } from "../hooks/index"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const SearchRequestsPage = () =>{
    //const { handleSelectUser, users, loading: selectLoading, errorMessage: selectErrorMessage } = useSelectUsername()
    const { handleRecv, loading: recvLoading, errorMessage: recvErrorMessage, users: recvUsers } = recvFriendRequests()
    const [username, setUsername] = useState("")
    const [sentUsers, setSentUsers] = useState<string[]>([])
    const navigate = useNavigate()

    useEffect(() => {
    handleRecv(); 
    }, []);

    return (
        <>
            <h1>フレンド申請ボックス</h1>
            

            {recvLoading && <p>検索中...</p>}
        
            {recvErrorMessage && <p>{recvErrorMessage}</p>}

            
            {recvUsers.length > 0 && (
                <ul>
                {recvUsers.map((u, i) => (
                    <li key={i} >
                        {u}
            
                    </li>
                ))}
                </ul>

            )} 

           


            {!recvLoading && recvUsers.length === 0 && !recvErrorMessage && (
                <p>ユーザが見つかりません</p>
            )}

            <button onClick={() => navigate('/dash')}>ダッシュボードページ</button>


        </>
    )
}
export default SearchRequestsPage