import { AnimeRes } from './types'

export async function getOneAnime(malAnimeId: number): Promise<AnimeRes> {
  const response = await fetch(import.meta.env.VITE_API_ROOT+'/anime/' + malAnimeId, {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  // console.log(response)
  return response.json()
}