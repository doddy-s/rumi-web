import { AnimePage } from './types'

export async function getCurrentSeasonAnimes(): Promise<AnimePage> {
  const response = await fetch(import.meta.env.VITE_API_ROOT+'/anime/season/current', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  // console.log(response)
  return response.json()
}