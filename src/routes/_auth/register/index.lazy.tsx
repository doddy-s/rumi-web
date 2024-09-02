import { createLazyFileRoute, Link } from '@tanstack/react-router'
import { OdemyLogo } from '@components/OdemyLogo.tsx'
import { GoogleButton } from '@components/GoogleButton.tsx'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { StatefulButton } from '@components/StatefulButton.tsx'
import { register } from '@api/auth/register'

export const Route: unknown = createLazyFileRoute('/_auth/register/')({
    component: Register
})

function Register() {
    const defaultButtonState = {
        text: 'Daftar',
        css: 'bg-[#D1EBF8] border-[#93D7FA] text-[#74C2EB]'
    }
    const [buttonState, setButtonState] = useState(defaultButtonState)

    const mutation = useMutation({
        mutationKey: ['register'],
        mutationFn: register,
        onMutate: () => {
            setButtonState({
                text: 'Sedang mendaftarkan anda',
                css: 'bg-yellow-200 border-yellow-600 text-yellow-600'
            })
        },
        onSuccess: (data) => {
            if (data.statusCode == 201) {
                setButtonState({
                    text: 'Anda sudah terdaftar silahkan masuk',
                    css: 'bg-green-200 border-green-600 text-green-600'
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
            email: { value: string },
            picture: { value: string },
            password: { value: string },
            confirmPassword: { value: string },
            sk: { checked: boolean }
        }
        const username = target.username.value
        const email = target.email.value
        const picture = target.picture.value
        const password = target.password.value
        // const confirmPassword = target.confirmPassword.value
        const sk = target.sk.checked

        // console.log({username, email, password, confirmPassword, sk})
        if (sk) {
            mutation.mutate({ username, email, picture, password })
        } else {
            setButtonState({
                text: 'Silahkan setujui Syarat & Ketentuan',
                css: 'bg-red-200 border-red-600 text-red-600'
            })
        }
    }

    // console.log(mutation.data)

    return (
        <>
            <div className="h-full flex items-center justify-center">
                <main className="h-full w-1/3 flex flex-col items-center justify-center gap-8">
                    <OdemyLogo />
                    <h1 className="text-4xl">Buat Akun Odemy</h1>
                    <h2 className="text-sm text-center text-gray-400">Lengkapi form di bawah menggunakan data Anda yang
                        valid</h2>
                    <GoogleButton text="Daftar menggunakan Google" />
                    <h2 className="text-gray-400">ATAU</h2>
                    <form onSubmit={submit} onChange={resetMutation}
                        className="w-full flex flex-col items-center justify-center text-sm text-gray-600 gap-4">
                        <input className="w-full rounded-md p-2 border-2 border-gray-300"
                            type="text" placeholder="Tulis nama lengkap kamu"
                            id="username" name="username" />
                        <input className="w-full rounded-md p-2 border-2 border-gray-300"
                            type="email" placeholder="Tulis email kamu (cth: mail@website.com)"
                            id="email" name="email" />
                        <input className="w-full rounded-md p-2 border-2 border-gray-300"
                            type="picture" placeholder="Tulis picture kamu (min. 8 karakter)"
                            id="picture" name="picture" />
                        <input className="w-full rounded-md p-2 border-2 border-gray-300"
                            type="password" placeholder="Tulis password kamu (min. 8 karakter)"
                            id="password" name="password" />
                        <input className="w-full rounded-md p-2 border-2 border-gray-300"
                            type="password" placeholder="Tulis password kamu (min. 8 karakter)"
                            id="confirmPassword" name="confirmPassword" />
                        <div className="w-full flex items-center justify-between">
                            <div>
                                <input type="checkbox" id="sk" name="sk" />
                                <p className="inline pl-2">Saya menerima{' '}
                                    <Link className="text-[#1799DD] underline">
                                        Syarat & Ketentuan
                                    </Link>
                                </p>
                            </div>

                            <div></div>
                        </div>
                        <StatefulButton buttonState={buttonState} />
                    </form>
                    <p className="text-gray-400">Belum punya akun?{' '}
                        <Link to={'/login'} className="text-[#1799DD] underline">
                            Masuk
                        </Link>
                    </p>
                </main>
            </div>
            {/*<div*/}
            {/*    className="hidden bg-[#D1EBF8] border-[#93D7FA] text-[#74C2EB] bg-yellow-200 border-yellow-600*/}
            {/*    text-yellow-600 bg-green-200 border-green-600 text-green-600 bg-red-200 border-red-600 text-red-600">*/}
            {/*</div>*/}
        </>
    )
}