import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    component: LayoutComponent,
})

function LayoutComponent() {
    return (
        <>
            <div className="h-screen">
                <Outlet/>
            </div>
        </>
    )
}
