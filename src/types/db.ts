import { PostgrestError } from "@supabase/supabase-js"

export type profileRow = {
    id: string,
    user: string,
    email: string
}

export type rowData = Record<string, string>

export type selectOptions = {
    table: string
    column: string
    eqKey: string
    eqVal: string
}




export type SupabaseResponseOne = {
  data: Record<string, string> | null
  error: PostgrestError | null
}

export type PostgrestSingleResponse<T> = {
  data: T | null;
  error: PostgrestError | null;
};




export type SupabaseResponseTwo = {
  data: Record<string, string>[] | null
  error: PostgrestError | null
}
