import { getRelatedStreams } from '@api/anime/getRelatedStreams'
import { StreamCarousel } from '@components/StreamCarousel'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/stream/$malId')({
  component: Stream
})

function Stream() {
  const { malId }: { malId: number } = Route.useParams()

  return (
    <>
      <div className="h-auto w-auto bg-black flex-col justify-center items-start m-8 pt-20">
        <StreamCarousel query={getRelatedStreams} title="Available Stream" isInfinite={false} malId={malId} />
      </div>
    </>
  )
}