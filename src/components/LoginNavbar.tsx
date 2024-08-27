import { Link } from '@tanstack/react-router'
import { OdemyLogo } from '@components/OdemyLogo.tsx'
export function LoginNavbar() {
    return (
        <>

            <nav className="h-16 w-full px-16 flex items-center justify-between">
                <OdemyLogo />
                <h2>Belum memiliki akun? <Link to={'/'} className="text-blue-400">Daftar Sekarang</Link></h2>
            </nav>
        </>
    )
}