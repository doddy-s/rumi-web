import { AuthContext } from '@contexts/AuthContext'
import { Link } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { useContext } from 'react'

export function MainNavbar() {
    const authContext = useContext(AuthContext)

    const logOut = () => {
        Cookies.remove('accessToken')
        Cookies.remove('isAuthenticated')

        authContext.setIsAuthenticated(false)
    }
    return (
        <>
            <nav className="h-auto w-full px-20 py-10 flex items-center justify-between fixed z-[9999]">
                <Link to="/">RUMI</Link>
                {authContext.isAuthenticated ? <button onClick={logOut}>LOGOUT</button> : <Link to="/login">LOGIN</Link>}
                <h1>Search</h1>
            </nav>
        </>
    )
}