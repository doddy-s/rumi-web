import Cookies from 'js-cookie'
import { PostHistoryReqDto, PostHistoryResDto } from './types'

export async function postHistory(history: PostHistoryReqDto): Promise<PostHistoryResDto> {
  const response = await fetch(import.meta.env.VITE_API_ROOT + '/history/', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + Cookies.get('accessToken')
    },
    body: JSON.stringify(history)
  })
  // console.log(response)
  return response.json()
}