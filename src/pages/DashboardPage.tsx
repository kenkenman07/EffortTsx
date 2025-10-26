import { useNavigate } from "react-router-dom"

const DashboardPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <h1>ダッシュボード</h1>

            <button onClick={() => navigate('/searuser')}>ユーザ検索ページ</button>
            <button onClick={() => navigate('/searreq')}>フレンド申請管理ボックス</button>
            
        </>
    )
}
export default DashboardPage