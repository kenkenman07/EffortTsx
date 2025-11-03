import { useEffect, useState } from "react";
import { getSession } from "../services/auth";

const useGetSession = () => {
    const [user, setUser] = useState<string>("")
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const user_id: (string | null) = await getSession()

                if(!user_id) throw new Error("ユーザidがnullです")

                setUser(user_id)
            } catch(error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    return { user, loading }
}
export default useGetSession