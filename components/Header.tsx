import React from 'react'
import Link from "next/link"
const Header = () => {
    return (
        <header className="bg-blue-500 py-2 px-4 flex justify-between items-center">
            <h1 className="text-xl text-white font-bold"><Link href="/">MyBook App</Link></h1>
            <nav className="flex justify-between itmes-center text-white">
                <li className="list-none mx-2"><Link href="/login" className="btn btn-outline btn-success btn-sm">Login</Link></li>
                <li className="list-none mx-2"><Link href="/logout" className="btn btn-outline btn-warning btn-sm" >Logout</Link></li>
                <li className="list-none mx-2"><Link href="/signup" className="btn btn-sm btn-secondary btn-outline">Sign Up</Link></li>
                <li className="list-none mx-2"><Link href="/admin/post">New</Link></li>
                <li className="list-none mx-2"><Link href="/admin">Admin</Link></li>
            </nav>
        </header>
    )
}

export default Header
