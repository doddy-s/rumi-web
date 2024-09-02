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

export async function getTopAnimes(): Promise<AnimePage> {
  const response = await fetch(import.meta.env.VITE_API_ROOT+'/anime/top', {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  // console.log(response)
  return response.json()
}