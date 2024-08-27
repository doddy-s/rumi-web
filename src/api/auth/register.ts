import { RegisterReqDto, RegisterResDto } from "./types"

export async function register(user : RegisterReqDto): Promise<RegisterResDto> {
    const response = await fetch(import.meta.env.VITE_API_ROOT+'/auth/register', {
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