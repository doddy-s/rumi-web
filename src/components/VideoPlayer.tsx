import { getEpisodeHls } from '@api/anime/getEpisodeHls'
import { ServerEnum } from '@api/anime/types'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'

export function VideoPlayer({ consumetId }: { consumetId: string | null }) {
  const [playing, setPlaying] = useState(false)
  const { data, isPending, isError } = useQuery({
    queryKey: ['servers', consumetId],
    queryFn: async () => await getEpisodeHls(consumetId, ServerEnum.VIDSTREAMING),
    retry: false,
    retryOnMount: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        setPlaying(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  if (isPending) return (
    <><h1 className="animate-pulse">Loading...</h1></>
  )

  if (isError) return (
    <>Error</>
  )

  return (
    <>
      <div className="h-full overflow-y-auto scrollbar-thumb-gray-800 scrollbar-track-gray-400 scrollbar-thin">
        <h1 className="mb-5">SCREEN</h1>
        <div className="w-3/4 aspect-video">
          <ReactPlayer url={data?.data[0]?.url} playing={playing} height="100%" width="100%" />
        </div>
        <button
          onClick={() => setPlaying(prev => !prev)} // Toggle the playing state
          className="mt-4 p-2 bg-green-400 text-white rounded">
          {playing ? 'Pause' : 'Play'}
        </button>
      </div>
    </>
  )
}