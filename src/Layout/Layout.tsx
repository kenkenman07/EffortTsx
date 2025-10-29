import { Outlet } from "react-router-dom"
import { useSetOnlineStatus, useGetSession, useSubscribe } from "../hooks/index"
//import type { Profile } from "../types/db"

const Layout = () => {
    const { user } = useGetSession()

    const userId = user?.id

    
    const errorMessage = useSetOnlineStatus(userId ?? null)
    let { friends, errorMessage: subscError } = useSubscribe()
    

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p> }

            {subscError && <p>{subscError}</p>}

            <ul>
                { friends.map((f) => (
                    <li key={f.id}>
                        <span>{f.user}</span>
                        <small >{f.status === "online" ? "● online" : "○ offline"}</small>
                    </li>
                    )) }
            </ul>


            <main>
                <Outlet />
            </main>

        </div>

    )
}
export default Layout