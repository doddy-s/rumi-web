import Cookies from 'js-cookie'
import { HistoryPage } from './types'

export async function getAuthenticatedUserHistory(): Promise<HistoryPage> {
  const response = await fetch(import.meta.env.VITE_API_ROOT+'/history/', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + Cookies.get('accessToken')
      }
  })
  // console.log(response)
  return response.json()
}