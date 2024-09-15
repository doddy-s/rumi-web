import { getStreams } from '@api/anime/getStreams'
import { StreamCarousel } from '@components/StreamCarousel'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stream/$malId')({
  component: Stream
})

function Stream() {
  const { malId }: { malId: number } = Route.useParams()

  return (
    <>
      <div className="h-auto w-auto bg-black flex-col justify-center items-start pt-24 px-20">
        <StreamCarousel query={getStreams} title="Available Stream" isInfinite={false} malId={malId} />
      </div>
    </>
  )
}