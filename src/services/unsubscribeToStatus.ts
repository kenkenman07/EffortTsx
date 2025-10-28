import { supabase } from "./makeSupabase";
import { RealtimeChannel } from "@supabase/supabase-js";

const unsubscribeToStatus = (channel: RealtimeChannel) => {
  supabase.removeChannel(channel)
}
export default unsubscribeToStatus