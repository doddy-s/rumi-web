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

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: RootComponent,
    notFoundComponent: NotFoundComponent
})

function RootComponent() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        setIsAuthenticated(Cookies.get('isAuthenticated') == 'true' ? true : false || false)
    }, [isAuthenticated])

    return (
        <>
            <AuthContext.Provider value={{
                accessToken: Cookies.get('accessToken') || '',
                isAuthenticated: isAuthenticated,
                setIsAuthenticated: setIsAuthenticated
            }}>
                <MainNavbar />
                <section className="overflow-hidden"><Outlet /></section>
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