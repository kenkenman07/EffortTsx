import { useSelectUsername, useSendFriendRequests } from "../hooks/index"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchUsersPage = () =>{
    const { handleSelectUser, users, loading: selectLoading, errorMessage: selectErrorMessage, you_id } = useSelectUsername()
    const { handleSend, loading: sendLoading, errorMessage: sendErrorMessage } = useSendFriendRequests()
    const [sentUsers, setSentUsers] = useState<string[]>([])
    const [username, setUsername] = useState("")
    const navigate = useNavigate()


    return (
        <>
            <h1>ユーザ検索ページ</h1>
            <form onSubmit={(e) => {e.preventDefault(); handleSelectUser(username)}} >
                <input value={username} placeholder="名前" onChange={(e) => setUsername(e.target.value)} />
                <button type="submit">検索</button>
            </form>

            {selectLoading && <p>検索中...</p>}
        
            {selectErrorMessage && <p>{selectErrorMessage}</p>}

            
            {users.length > 0 && (
                <ul>
                {users.map(({id, username, sentRequests, isFriend}) => (
                    <li key={id} >
                        <span>{username}</span>

                        { id === you_id ?  (
                            <button disabled>あなた</button>

                        ) : isFriend ? (
                            <button disabled>フレンド</button>
                        ) : sentRequests || sentUsers.includes(username) ?  (
                            <button disabled>申請済み</button>
                        ) : (
                            <button onClick={async () => {
                                handleSend(username)
                                setSentUsers((prev) => [...prev, username]);
                            }}
                            >{sendLoading ? '申請中...': 'フレンド申請'}</button>
                        )}
                    </li>
                ))}
                </ul>
            )}

         

            {sendErrorMessage && <p>{sendErrorMessage}</p>}


            {!selectLoading && users.length === 0 && !selectErrorMessage && (
                <p>ユーザが見つかりません</p>
            )}

            <button onClick={() => navigate('/dash')}>ダッシュボードページ</button>


        </>
    )
}
export default SearchUsersPage