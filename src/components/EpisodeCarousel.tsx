import { getEpisodes } from '@api/anime/getEpisodes'
import { useQuery } from '@tanstack/react-query'
import { EpisodeButton } from './EpisodeButton'
import { useContext } from 'react'
import { WatchContext } from '@contexts/WatchContext'
import { useSearch } from '@tanstack/react-router'

export function EpisodeCarousel() {
  const { streamId } = useContext(WatchContext)

  const search = useSearch({ from: '/watch/$streamId' })

  const { data, isPending, isError } = useQuery({
    queryKey: ['episodes', streamId],
    queryFn: async () => await getEpisodes(streamId)
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
          {data?.data?.episodes?.map((episode) => <><EpisodeButton episode={episode} key={episode.consumetId} isActive={episode.consumetId == search?.episodeId} /></>)}
        </div>
      </div>
    </>
  )
}