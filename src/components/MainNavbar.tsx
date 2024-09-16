import { AuthContext } from '@contexts/AuthContext'
import { OptionsContext } from '@contexts/OptionsContext'
import { Link } from '@tanstack/react-router'
import Cookies from 'js-cookie'
import { useContext } from 'react'

export function MainNavbar() {
    const authContext = useContext(AuthContext)
    const optionsContext = useContext(OptionsContext)

    const logOut = () => {
        Cookies.remove('accessToken')
        Cookies.remove('isAuthenticated')

        authContext.setIsAuthenticated(false)
    }
    return (
        <>
            <nav className="h-auto w-full px-20 py-10 flex items-center justify-between fixed z-[9999]">
                <Link to="/">RUMI</Link>

                <div className="flex gap-8 justify-center items-center">
                    {authContext.isAuthenticated ? <button onClick={logOut} className="text-red-400">LOGOUT</button> :
                        <div><Link to="/login" className="text-green-400">LOGIN</Link>/<Link to="/register" className="text-green-400">REGISTER</Link></ div>}
                    <h1>SEARCH</h1>
                    <button onClick={() => { optionsContext.setRichPresenceIsEnable(!optionsContext.richPresenceIsEnable) }} disabled={!optionsContext.richPresenceIsAvailable}>
                        {optionsContext.richPresenceIsAvailable ? optionsContext.richPresenceIsEnable ? <>RICH-PRESENCE-ON</> : <>RICH-PRESENCE-OFF</> : <>RICH-PRESENCE-NOT-DETECTED</>}
                    </button>
                </div>
            </nav>
        </>
    )
}