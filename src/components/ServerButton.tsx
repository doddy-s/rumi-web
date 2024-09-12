import { ServerEnum } from '@api/anime/types'
import { WatchContext } from '@contexts/WatchContext'
import { useContext } from 'react'

export function ServerButton({ server, isActive }: { server: ServerEnum, isActive: boolean }) {
  const watchContext = useContext(WatchContext) 
  return (
    <>
      <button className={`w-auto px-1 rounded-sm flex justify-center items-center hover:bg-gray-800 bg-opacity-100 hover:bg-opacity-50 
        ${isActive ? 'bg-gray-800' : 'bg-gray-400'}`} onClick={() => {watchContext.setActiveServer(server)}}>
        {server}
      </button>
    </>
  )
}
