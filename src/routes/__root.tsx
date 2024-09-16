import {
    Outlet,
    createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { MainNavbar } from '@components/MainNavbar'
import { MainFooter } from '@components/MainFooter'
import { AuthContext } from '@contexts/AuthContext'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { OptionsContext } from '@contexts/OptionsContext'
import { getStatus } from '@api/rumiRichPresence/getStatus'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: RootComponent,
    notFoundComponent: NotFoundComponent
})

function RootComponent() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [richPresenceIsEnable, setRichPresenceIsEnable] = useState(false)
    const [richPresenceIsAvailable, setRichPresenceIsAvailable] = useState(false)

    useEffect(() => {
        setIsAuthenticated(Cookies.get('isAuthenticated') == 'true' ? true : false || false)
    }, [isAuthenticated])

    useEffect(() => {
        getStatus().then((value) => {
            console.log(value)
            setRichPresenceIsAvailable(value.statusCode == 200)
        })
        setRichPresenceIsEnable(Cookies.get('richPresenceIsEnable') === 'true');
    }, [])

    useEffect(() => {
        if (richPresenceIsEnable) {
            Cookies.set('richPresenceIsEnable', 'true')
            return
        }
        Cookies.set('richPresenceIsEnable', 'false')
    }, [richPresenceIsEnable])

    return (
        <>
            <AuthContext.Provider value={{
                accessToken: Cookies.get('accessToken') || '',
                isAuthenticated: isAuthenticated,
                setIsAuthenticated: setIsAuthenticated
            }}>
                <OptionsContext.Provider value={{
                    richPresenceIsAvailable: richPresenceIsAvailable,
                    richPresenceIsEnable: richPresenceIsEnable,
                    setRichPresenceIsEnable: setRichPresenceIsEnable
                }}>
                    <MainNavbar />
                    <section className="overflow-hidden">
                        <Outlet />
                    </section>
                </OptionsContext.Provider>
            </AuthContext.Provider>
            <ReactQueryDevtools buttonPosition="bottom-right" />
            <TanStackRouterDevtools position="bottom-right" />
            <MainFooter />
        </>
    )
}

function NotFoundComponent() {
    return (
        <>Not Found</>
    )
}