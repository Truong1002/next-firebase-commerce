"use client"

import { signOut } from "next-auth/react"

const Logout = () => {
    return (
        <div className="cursor-pointer" onClick={() => signOut()}>
            Logout
        </div>
    )
}

export default Logout