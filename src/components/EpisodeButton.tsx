import { Episode } from '@api/anime/types'
import { WatchContext } from '@context/WatchContext'
import { Link } from '@tanstack/react-router'
import { useContext } from 'react'

export function EpisodeButton({ episode }: { episode: Episode }) {
  const consumetId = useContext<string>(WatchContext)
  return (
    <>
      <Link to="/watch/$consumetId" params={{ consumetId: consumetId }} search={{consumetId: episode.consumetId}} 
      className="h-10 w-full rounded-sm flex justify-start items-center my-4 bg-none hover:bg-gray-700 bg-opacity-0 hover:bg-opacity-50">
        {episode?.title}
      </Link>
    </>
  )
}