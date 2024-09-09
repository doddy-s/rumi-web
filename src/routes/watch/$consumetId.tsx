import { EpisodeCarousel } from '@components/EpisodeCarousel'
import { WatchContext } from '@context/WatchContext'
import { createFileRoute, useSearch } from '@tanstack/react-router'

type WatchSearch = {
  consumetId: string
}

export const Route = createFileRoute('/watch/$consumetId')({
  validateSearch: (search: Record<string, unknown>): WatchSearch => {
    return {
      consumetId: search?.consumetId as string || ''
    }
  },
  component: Watch
})

function Watch() {
  const { consumetId }: { consumetId: string } = Route.useParams()

  const search = useSearch({from: '/watch/$consumetId'})

  return (
    <>
      <WatchContext.Provider value={consumetId} >
        <div className="h-auto w-auto bg-blue-950 flex justify-center items-start m-20">
          <div className="bg-pink-800 w-1/5 h-screen p-5">
            <h1>EPISODES</h1>
            <EpisodeCarousel />
          </div>
          <div className="bg-purple-800 w-4/5 h-screen p-5">
            {search.consumetId}
          </div>
        </div>
      </WatchContext.Provider>
    </>
  )
}