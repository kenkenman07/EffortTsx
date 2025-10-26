import { supabase } from "./makeSupabase";
import type { selectOptions } from "../types/db";

const selectOne = async ({ table, column, eqKey, eqVal }: selectOptions): Promise<string[]> => {
    let query = supabase
        .from(table)
        .select(column)
        .eq(eqKey, eqVal)
       

    const { data, error } = await query
    if(error) throw error
    return data ?? []
        

}
export default selectOne