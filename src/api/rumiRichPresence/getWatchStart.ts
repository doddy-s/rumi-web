import { BaseResDto } from '@api/types'

export async function getWatchStart({ title, number, image }: { title: string, number: number, image: string }): Promise<BaseResDto> {
  const response = await fetch(import.meta.env.VITE_RICH_PRESENCE_ROOT + `/watch/start?title=${title}&number=${number}&image=${image}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}