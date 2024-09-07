import { Link } from '@tanstack/react-router'

export function MainNavbar() {
    return (
        <>
            <nav className="h-auto w-full px-20 py-10 flex items-center justify-between fixed z-[9999]">
                <Link to="/">RUMI</Link>
                <h1>Search</h1>
            </nav>
        </>
    )
}