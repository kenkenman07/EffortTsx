import { supabase } from "./makeSupabase";
import type { RealtimeChannel } from "@supabase/supabase-js";
import type { StatusPayload } from "../types/db";

const createChannel = (): RealtimeChannel => {
    return supabase.channel('statusChange')
}

const registerEvent = (channel: RealtimeChannel, onChange: ((payload: StatusPayload) => void)): void => {
    channel.on('postgres_changes', { event: "UPDATE", schema: "public", table: "profiles" },
        (payload) => {

            console.log('event発火:', payload)

            if(payload.new) { 
            const { id, status } = payload.new as StatusPayload
            onChange({id, status})
        }}
    )
}

const subscribeChannel = async (channel: RealtimeChannel): Promise<RealtimeChannel> => {
    const result = channel.subscribe((status) => {
        console.log('購読ステータス:', status)
    }) 

    return result
}

const subscribeToStatus = async (onChange: (payload: StatusPayload) => void): Promise<RealtimeChannel> => {
    const channel = createChannel()
    registerEvent(channel, onChange)   
    return await subscribeChannel(channel)
}
export default subscribeToStatus