import { Episode } from '@api/anime/types'
import { WatchContext } from '@contexts/WatchContext'
import { Link } from '@tanstack/react-router'
import { useContext } from 'react'

export function EpisodeButton({ episode, isActive }: { episode: Episode, isActive: boolean }) {
  const consumetId = useContext<string>(WatchContext)
  
  return (
    <>
      <Link to="/watch/$consumetId" params={{ consumetId: consumetId }} search={{consumetId: episode.consumetId}} 
      className={`h-8 aspect-square rounded-sm flex justify-center items-center hover:bg-gray-800 bg-opacity-100 hover:bg-opacity-50 
        ${isActive ? 'bg-gray-800' : 'bg-gray-400'}`
      }>
        {episode?.number}
      </Link>
    </>
  )
}