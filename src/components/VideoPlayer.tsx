import { getEpisodeHls } from '@api/anime/getEpisodeHls'
import { getEpisodes } from '@api/anime/getEpisodes'
import { ServerEnum } from '@api/anime/types'
import { WatchContext } from '@contexts/WatchContext'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useContext, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { ServerButton } from './ServerButton'
import { QualityButton } from './QualityButton'

export function VideoPlayer() {
  const [playing, setPlaying] = useState(true)
  const [episodeId, setEpisodeId] = useState<string | null>('')

  useEffect(() => {
    const goFullScreen = () => {
      if (document.fullscreenElement) {
        document.exitFullscreen()
      }
  
      videoPlayerRef?.current?.requestFullscreen()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault()
        setPlaying(prev => !prev)
      }

      if (event.code === 'KeyF') {
        goFullScreen()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  })

  const watchSearch = useSearch({ from: '/watch/$streamId' })

  useEffect(() => {
    setEpisodeId(watchSearch.episodeId)
  }, [watchSearch.episodeId])

  const videoPlayerRef = useRef<HTMLDivElement>(null)

  const watchContext = useContext(WatchContext)
  const episodesQuery = useQuery({
    queryKey: ['episodes', watchContext.streamId],
    queryFn: async () => await getEpisodes(watchContext.streamId)
  })

  const episodeQuery = useQuery({
    queryKey: ['servers', episodeId, watchContext.activeServer],
    queryFn: async () => await getEpisodeHls(episodeId, watchContext.activeServer),
    enabled: episodeId != null,
    retry: false,
    retryOnMount: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  const navigate = useNavigate()

  if (episodeId == null) return (<></>)

  if (episodeQuery.isError) return (
    <>Error</>
  )

  const redirectToNextEpisode = () => {
    navigate({
      to: '/watch/$streamId',
      params: {
        streamId: watchContext.streamId || ''
      },
      search: {
        episodeId: episodesQuery?.data?.data?.list[
          episodesQuery?.data?.data?.list.findIndex((episode) => episode.consumetId == episodeId) + 1
        ].consumetId || null
      }
    })
  }

  return (
    <>
      <div className="h-full overflow-y-auto scrollbar-thumb-gray-800 scrollbar-track-gray-400 scrollbar-thin">
        <h1 className="mb-5">SCREEN</h1>
        <div className="relative w-3/4 aspect-video">
          <div className="absolute h-full w-full" id="video-player" ref={videoPlayerRef}>
            <ReactPlayer url={episodeQuery.isPending ? '' :
              episodeQuery.data?.data[episodeQuery.data?.data.findIndex((episode) => episode.videoQuality == watchContext.activeQuality)]?.url}
              playing={playing} height="100%" width="100%" controls={true} onEnded={redirectToNextEpisode}
            />
          </div>
        </div>
        <div className="h-auto w-3/4 mt-5">
          <div className="flex flex-col justify-center items-start gap-2">
            <div className="flex gap-2">
              <h2>Server</h2>
              {Object.values(ServerEnum).map((server) => (
                <>
                  <ServerButton server={server} isActive={server == watchContext.activeServer} />
                </>
              ))}
            </div>
            <div className="flex gap-2">
              <h2>Quality</h2>
              {episodeQuery.data?.data?.map((server) => (
                <>
                  <QualityButton quality={server?.videoQuality} isActive={server?.videoQuality == watchContext.activeQuality} />
                </>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}