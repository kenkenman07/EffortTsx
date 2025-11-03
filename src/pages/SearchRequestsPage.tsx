import { useAcceptFriendRequests, useRecvFriendRequests } from "../hooks/index"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const SearchRequestsPage = () =>{
    const { handleMakeFriends, loading: acceptLoading, errorMessage: acceptErrorMessage } = useAcceptFriendRequests()
    const { handleRecv, loading: recvLoading, errorMessage: recvErrorMessage, users: recvUsers } = useRecvFriendRequests()
    //const [username, setUsername] = useState("")
    const [sentUsers, setSentUsers] = useState<string[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        handleRecv(); 
    }, []);

    return (
        <>
            <h1>フレンド申請ボックス</h1>
            

            {recvLoading && <p>検索中...</p>}
        
            {recvErrorMessage && <p>{acceptErrorMessage}</p>}

            
            {recvUsers.length > 0 && (
                <ul>
                {recvUsers.map((u, i) => (
                    <li key={i} >
                        {u}
                        {sentUsers.includes(u) ? ( 
                        <button disabled>承認済み</button> 
                        ) : ( 
                        <button onClick={async () => {
                            handleMakeFriends(u) 
                            setSentUsers((prev) => [...prev, u])
                            }}>
                            {acceptLoading ? "承認中..." : "承認"}
                            </button> )
                        }
                    </li>
                ))}
                </ul>

            )} 

            {acceptErrorMessage && <p>{acceptErrorMessage}</p>}           


            {!recvLoading && recvUsers.length === 0 && !recvErrorMessage && (
                <p>ユーザが見つかりません</p>
            )}

            <button onClick={() => navigate('/dash')}>ダッシュボードページ</button>


        </>
    )
}
export default SearchRequestsPage