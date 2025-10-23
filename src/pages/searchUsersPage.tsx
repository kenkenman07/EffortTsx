import { useSelectUsername } from "../hooks/index"
import { useState } from "react"

const SearchUsersPage = () =>{
    const { handleSelectUser, users, loading, errorMessage } = useSelectUsername()

    return (
        <>
            <h1>ユーザ検索ページ</h1>
        
        </>
    )
}
export default SearchUsersPage