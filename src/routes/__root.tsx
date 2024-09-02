import {
    Outlet,
    createRootRouteWithContext,
} from '@tanstack/react-router'
import {TanStackRouterDevtools} from '@tanstack/router-devtools'
import {QueryClient} from '@tanstack/react-query'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import { MainNavbar } from '@components/MainNavbar'
import { MainFooter } from '@components/MainFooter'

export const Route = createRootRouteWithContext<{
    queryClient: QueryClient
}>()({
    component: RootComponent,
    notFoundComponent: NotFoundComponent
})

function RootComponent() {
    return (
        <>
            <MainNavbar />
            <Outlet />
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