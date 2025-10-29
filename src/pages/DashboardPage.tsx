import { useNavigate } from "react-router-dom"

const DashboardPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <h1>ダッシュボード</h1>

            <button onClick={() => navigate('/searuser')}>ユーザ検索ページ</button>
            <button onClick={() => navigate('/searreq')}>フレンド申請管理ボックス</button>
            <button onClick={() => navigate('/searfri')}>フレンド一覧</button>
            <button onClick={() => navigate('/')}>ログイン画面</button>
            <button onClick={() => navigate('/task')}>タスクページ</button>
        </>
    )
}
export default DashboardPage