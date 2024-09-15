import { ServerEnum, ServerList } from './types'

export async function getServers(consumetEpisodeId: string | null, server: ServerEnum): Promise<ServerList> {
  const response = await fetch(import.meta.env.VITE_API_ROOT+'/anime/server/' + consumetEpisodeId + '?server=' + server, {
      method: 'GET',
      mode: 'cors',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  // console.log(response)
  return response.json()
}