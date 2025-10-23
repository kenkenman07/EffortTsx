import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSession } from "../services/index";

const useGetSession = () => {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const session = await getSession()
                setSession(session)
            } finally {
                setLoading(false)
            }
        }
        checkLogin()
    }, [])

    return { session, user: session?.user ?? null, loading}
}
export default useGetSession