import { supabase } from "./makeSupabase";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";

const name_id = async (fromNameOrId: string, fromEq: string, toNameOrId: string): Promise<string> => {

    console.log('from:', fromNameOrId, 'fromEq:', fromEq, 'to:', toNameOrId) 

    const result: PostgrestSingleResponse<Record<string, string>>= await supabase
    .from('profiles')
    .select(toNameOrId)
    .eq(fromEq, fromNameOrId)
    .single()
    
    if(result.error) throw result.error
    

    const data = result.data
    const nameOrId: string = data[toNameOrId]

    //console.log("変換後:",nameOrId)

    return nameOrId 
}

export default name_id