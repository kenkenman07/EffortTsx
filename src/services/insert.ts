import { supabase } from "./makeSupabase";
import type { rowData } from "../types/db";

const insert = async (table: string, ...row: rowData[]) => {
    const { data, error } = await supabase
        .from(table)
        .insert(row)
        
    if(error) throw error

    return data
}
export default insert