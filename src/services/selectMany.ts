import { supabase } from "./makeSupabase";
import type { selectOptions } from "../types/db";
import type { PostgrestResponse } from "@supabase/supabase-js";

const selectMany = async ({ table, column, eqKey, eqVal }: selectOptions): Promise<Record<string, string>[] |null> => {
    const result = (await supabase
        .from(table)
        .select(column)
        .eq(eqKey, eqVal)) as unknown as PostgrestResponse<Record<string, string>>;
       
    if(result.error) throw result.error
    return result.data ?? []
        

}
export default selectMany