import { PostgrestError } from "@supabase/supabase-js"

export type Profile = {
    id: string,
    user: string,
    status: 'online' | 'offline'
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

export type StatusPayload = { id: string, status: 'online' | 'offline' }
