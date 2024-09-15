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
                {authContext.isAuthenticated ? <button onClick={logOut} className="text-red-400">LOGOUT</button> : 
                <div><Link to="/login" className="text-green-400">LOGIN</Link>/<Link to="/register" className="text-green-400">REGISTER</Link></ div>}
                <h1>SEARCH</h1>
            </nav>
        </>
    )
}