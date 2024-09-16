import { BaseResDto } from '@api/types'

export async function getStatus(): Promise<BaseResDto> {
  const response = await fetch(import.meta.env.VITE_RICH_PRESENCE_ROOT, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return response.json()
}