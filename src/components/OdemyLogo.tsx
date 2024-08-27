import odemyLogo from '@assets/together.svg'
import {Link} from '@tanstack/react-router'

export function OdemyLogo() {
    return (
        <>
            <Link to={'/'}>
                <img src={odemyLogo} alt="odemy"/>
            </Link>
        </>
    )
}