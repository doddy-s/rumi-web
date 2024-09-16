import { BaseResDto } from '@api/types'

export async function getWatchStop(): Promise<BaseResDto> {
  const response = await fetch(import.meta.env.VITE_RICH_PRESENCE_ROOT + '/watch/stop', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}