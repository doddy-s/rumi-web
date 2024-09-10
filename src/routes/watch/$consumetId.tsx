import { EpisodeCarousel } from '@components/EpisodeCarousel'
import { VideoPlayer } from '@components/VideoPlayer'
import { WatchContext } from '@contexts/WatchContext'
import { createFileRoute, useSearch } from '@tanstack/react-router'

type WatchSearch = {
  consumetId: string | null
}

export const Route = createFileRoute('/watch/$consumetId')({
  validateSearch: (search: Record<string, unknown>): WatchSearch => {
    return {
      consumetId: search?.consumetId as string || null
    }
  },
  component: Watch
})

function Watch() {
  const { consumetId }: { consumetId: string } = Route.useParams()

  const search = useSearch({ from: '/watch/$consumetId' })

  return (
    <>
      <WatchContext.Provider value={consumetId} >
        <div className="h-[90vh] w-auto flex justify-center items-start pt-24 mx-20">
          <div className="h-full w-auto">
            <EpisodeCarousel />
          </div>
          <div className="w-full h-full ml-8">
            {search.consumetId == null ? <></> : <VideoPlayer consumetId={search?.consumetId} />}
          </div>
        </div>
      </WatchContext.Provider>
    </>
  )
}