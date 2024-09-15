import { LoginReqDto, LoginResDto } from './types'

export async function login(user : LoginReqDto): Promise<LoginResDto> {
    const response = await fetch(import.meta.env.VITE_API_ROOT+'/auth/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    // console.log(response)
    return response.json()
}