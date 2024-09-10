import { getEpisodes } from '@api/anime/getEpisodes'
import { useQuery } from '@tanstack/react-query'
import { EpisodeButton } from './EpisodeButton'
import { useContext } from 'react'
import { WatchContext } from '@contexts/WatchContext'
import { useSearch } from '@tanstack/react-router'

export function EpisodeCarousel() {
  const consumetId = useContext(WatchContext)

  const search = useSearch({ from: '/watch/$consumetId' })

  const { data, isPending, isError } = useQuery({
    queryKey: ['episodes', consumetId],
    queryFn: async () => await getEpisodes(consumetId)
  })

  if (isPending) return (
    <><h1 className="animate-pulse">Loading...</h1></>
  )

  if (isError) return (
    <>Error</>
  )

  return (
    <>
      <div className="h-full overflow-y-auto scrollbar-thumb-gray-800 scrollbar-track-gray-400 scrollbar-thin">
        <h1 className="mb-5">EPISODE</h1>
        <div className="h-auto w-auto grid grid-cols-4 gap-4 mr-5">
          {data?.data?.list?.map((episode, i) => <><EpisodeButton episode={episode} key={i} isActive={episode.consumetId == search?.consumetId} /></>)}
        </div>
      </div>
    </>
  )
}