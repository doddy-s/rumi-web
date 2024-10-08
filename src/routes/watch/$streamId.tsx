import { ServerEnum, VideoQualityEnum } from '@api/anime/types'
import { EpisodeCarousel } from '@components/EpisodeCarousel'
import { VideoPlayer } from '@components/VideoPlayer'
import { WatchContext } from '@contexts/WatchContext'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useState } from 'react'

type WatchSearch = {
  episodeId?: string | null
  second?: number | null
}

export const Route = createFileRoute('/watch/$streamId')({
  validateSearch: (search: Record<string, unknown>): WatchSearch => {
    return {
      episodeId: search?.episodeId as string || null,
      second: search?.second as number || null
    }
  },
  component: Watch
})

function Watch() {
  const { streamId }: { streamId: string } = Route.useParams()
  const watchSearch = useSearch({ from: '/watch/$streamId' })
  const [activeServer, setActiveServer] = useState(ServerEnum.VIDSTREAMING)
  const [activeQuality, setActiveQuality] = useState(VideoQualityEnum.FHD)

  return (
    <>
      <WatchContext.Provider value={{
        streamId: streamId,
        activeServer: activeServer,
        activeQuality: activeQuality,
        setActiveServer: setActiveServer,
        setActiveQuality: setActiveQuality
      }} >
        <div className="h-screen w-auto flex justify-center items-start pt-24 mx-20">
          <div className="h-full w-auto">
            <EpisodeCarousel />
          </div>
          <div className="w-full h-full ml-8">
            {watchSearch.episodeId == null ? (
              <></>
            ) : (
              <VideoPlayer episodeId={watchSearch.episodeId} startAt={watchSearch.second || 0}/>
            )}
          </div>
        </div>
      </WatchContext.Provider>
    </>
  )
}