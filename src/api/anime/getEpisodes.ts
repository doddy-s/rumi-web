import { EpisodeList } from './types'

export async function getEpisodes(consumetId: string): Promise<EpisodeList> {
  const response = await fetch(import.meta.env.VITE_API_ROOT+'/anime/episodes/' + consumetId, {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  // console.log(response)
  return response.json()
}