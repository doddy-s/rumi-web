import { GoogleButton } from '@components/GoogleButton.tsx'
import { createLazyFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { OdemyLogo } from '@components/OdemyLogo.tsx'
import React, { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { StatefulButton } from '@components/StatefulButton.tsx'
import { login } from '@api/auth/login'
import Cookies from 'js-cookie'
import { AuthContext } from '@contexts/AuthContext'

export const Route: unknown = createLazyFileRoute('/_auth/login/')({
    component: Login
})

function Login() {
    const defaultButtonState = {
        text: 'Masuk',
        css: 'bg-[#D1EBF8] border-[#93D7FA] text-[#74C2EB]'
    }
    const [buttonState, setButtonState] = useState(defaultButtonState)

    const navigate = useNavigate()
    const authContext = useContext(AuthContext)

    const mutation = useMutation({
        mutationKey: ['login'],
        mutationFn: login,
        onMutate: () => {
            setButtonState({
                text: 'Sedang memasukkan anda',
                css: 'bg-yellow-200 border-yellow-600 text-yellow-600'
            })
        },
        onSuccess: (data) => {
            if (data.statusCode == 200) {
                setButtonState({
                    text: 'Anda sudah masuk silahkan redirect',
                    css: 'bg-green-200 border-green-600 text-green-600'
                })

                Cookies.set('accessToken', data.data.accessToken, {
                    secure: true,
                })

                Cookies.set('isAuthenticated', 'true')

                authContext.setIsAuthenticated(true)

                navigate({
                    to: '/'
                })
            } else {
                setButtonState({
                    text: data.message,
                    css: 'bg-red-200 border-red-600 text-red-600'
                })
            }
        },
        onError: () => {
            setButtonState({
                text: 'Error',
                css: 'bg-red-200 border-red-600 text-red-600'
            })
        }
    })

    function resetMutation() {
        mutation.reset()
        setButtonState(defaultButtonState)
    }

    async function submit(e: React.SyntheticEvent) {
        e.preventDefault()
        const target = e.target as typeof e.target & {
            username: { value: string },
            password: { value: string },
            remember: { checked: boolean }
        }
        const username = target.username.value
        const password = target.password.value
        // const remember = target.remember.checked

        // console.log({fullName, username, password, confirmPassword, sk})
        mutation.mutate({ username, password })
    }

    return (
        <>
            <div className="h-full flex items-center justify-center">
                <main className="h-full w-1/3 flex flex-col items-center justify-center gap-8">
                    <OdemyLogo />
                    <h1 className="text-4xl">Masuk ke Odemy</h1>
                    <h2 className="text-sm text-center text-gray-400">Hubungkan dengan akun sosial atau masukkan alamat
                        username dan kata sandi Anda.</h2>
                    <GoogleButton text="Masuk dengan Google" />
                    <h2 className="text-gray-400">ATAU</h2>
                    <form className="w-full flex flex-col items-center justify-center text-sm text-gray-600 gap-4"
                        onSubmit={submit} onChange={resetMutation}>
                        <input className="w-full rounded-md p-2 border-2 border-gray-300"
                            type="username" placeholder="Tulis username kamu (cth: mail@website.com)"
                            id="username" name="username" />
                        <input className="w-full rounded-md p-2 border-2 border-gray-300"
                            type="password" placeholder="Tulis password kamu (min. 8 karakter)"
                            id="password" name="password" />
                        <div className="w-full flex items-center justify-between">
                            <div>
                                <input type="checkbox" />
                                <p className="inline pl-2">Ingat saya</p>
                            </div>
                            <Link className="text-[#1799DD] underline">
                                Lupa password?
                            </Link>
                        </div>
                        <StatefulButton buttonState={buttonState} />
                    </form>
                    <p className="text-gray-400">Belum memiliki akun?{' '}
                        <Link to={'/register'} className="text-[#1799DD] underline">
                            Daftar sekarang
                        </Link>
                    </p>
                </main>
            </div>
        </>
    )
}