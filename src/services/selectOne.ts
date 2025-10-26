import { supabase } from "./makeSupabase";
import type { selectOptions, PostgrestSingleResponse } from "../types/db";


const selectOne = async ({ table, column, eqKey, eqVal }: selectOptions): Promise<Record<string, string> | null> => {
    const result: PostgrestSingleResponse<Record<string, string>> = await supabase
        .from(table)
        .select(column)
        .eq(eqKey, eqVal)
        .single()
    
    if(result.error) throw result.error

    return result.data ?? null
    

}
export default selectOne