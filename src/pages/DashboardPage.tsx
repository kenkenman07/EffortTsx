import { useNavigate } from "react-router-dom"

const DashboardPage = () => {
    const navigate = useNavigate()

    return (
        <>
            <h1>ダッシュボード</h1>

            <button onClick={() => navigate('/searuser')}>ユーザ検索ページ</button>
            <div>黙れ</div>
        </>
    )
}
export default DashboardPage