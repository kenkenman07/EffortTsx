import { supabase } from "./makeSupabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { StatusPayload } from "../types/db";

const createChannel = (): RealtimeChannel => {
    return supabase.channel('statusChange')
}

const registerEvent = (channel: RealtimeChannel, onChange: ((payload: StatusPayload) => void)): void => {
    channel.on('postgres_changes', { event: "*", schema: "public", table: "profiles" },
        (payload) => {if(payload.new) { 
            const { id, status } = payload.new as StatusPayload
            onChange({id, status})
        }}
    )
}

const subscribeChannel = (channel: RealtimeChannel): RealtimeChannel => {
    channel.subscribe()
    return channel
}

const subscribeToStatus = (onChange: (payload: StatusPayload) => void): RealtimeChannel => {
    const channel = createChannel()
    registerEvent(channel, onChange)   
    return subscribeChannel(channel)
}
export default subscribeToStatus