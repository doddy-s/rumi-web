import { StreamList } from './types'

export async function getRelatedStreams(malId: number): Promise<StreamList> {
  const response = await fetch(import.meta.env.VITE_API_ROOT+'/anime/stream/' + malId, {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  // console.log(response)
  return await response.json()
}