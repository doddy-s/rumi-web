import { getEpisodes } from '@api/anime/getEpisodes'
import { WatchContext } from '@contexts/WatchContext'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { useContext, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player/lazy'
import { VideoPlayerOption } from './VideoPlayerOption'
import { getServers } from '@api/anime/getServers'

export function VideoPlayer() {
  const [playing, setPlaying] = useState(true)
  const [episodeId, setEpisodeId] = useState<string | null>('')
  const [activeUrl, setActiveUrl] = useState<string>('')
  const videoPlayerRef = useRef<HTMLDivElement>(null)
  
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


  const watchContext = useContext(WatchContext)
  const episodesQuery = useQuery({
    queryKey: ['episodes', watchContext.streamId],
    queryFn: async () => await getEpisodes(watchContext.streamId)
  })

  const serversQuery = useQuery({
    queryKey: ['servers', episodeId, watchContext.activeServer],
    queryFn: async () => await getServers(episodeId, watchContext.activeServer),
    enabled: episodeId != null,
    retry: false,
    retryOnMount: false,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false
  })

  useEffect(() => {
    setActiveUrl(serversQuery?.data?.data?.servers?.find((server) => server.videoQuality == watchContext.activeQuality)?.url || '')
  }, [serversQuery?.data?.data, watchContext.activeQuality, watchContext.activeServer])
  
  const navigate = useNavigate()
  
  const redirectToNextEpisode = () => {
    navigate({
      to: '/watch/$streamId',
      params: {
        streamId: watchContext.streamId || ''
      },
      search: {
        episodeId: episodesQuery?.data?.data?.episodes[
          episodesQuery?.data?.data?.episodes?.findIndex((episode) => episode.consumetId == episodeId) + 1
        ]?.consumetId || null
      }
    })
  }
  
  if (episodeId == null) return (<></>)

  if (serversQuery.isError) return (
    <>Error</>
  )


  return (
    <>
      <div className="h-full overflow-y-auto scrollbar-thumb-gray-800 scrollbar-track-gray-400 scrollbar-thin">
        <h1 className="mb-5">SCREEN</h1>
        <div className="relative w-3/4 aspect-video">
          <div className="absolute h-full w-full" id="video-player" ref={videoPlayerRef}>
            <ReactPlayer key={activeUrl} url={activeUrl}
              playing={playing} height="100%" width="100%" controls={true} onEnded={redirectToNextEpisode}
            />
          </div>
        </div>
        <VideoPlayerOption servers={serversQuery.data?.data?.servers || null}/>
      </div>
    </>
  )
}