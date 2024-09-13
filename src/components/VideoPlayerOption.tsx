import { Server, ServerEnum } from '@api/anime/types'
import { ServerButton } from './ServerButton'
import { useContext } from 'react'
import { WatchContext } from '@contexts/WatchContext'
import { QualityButton } from './QualityButton'

export function VideoPlayerOption({ episode }: { episode: Server[] | null}) {
  const watchContext = useContext(WatchContext)

  return (
    <>
      <div className="h-auto w-3/4 mt-5">
        <div className="flex flex-col justify-center items-start gap-2">
          <div className="flex gap-2">
            <h2>Server</h2>
            {Object.values(ServerEnum).map((server) => (
              <>
                <ServerButton server={server} key={server} isActive={server == watchContext.activeServer} />
              </>
            ))}
          </div>
          <div className="flex gap-2">
            <h2>Quality</h2>
            {episode == null ? (<>Loading...</>) : episode?.map((server) => (
              <>
                <QualityButton quality={server?.videoQuality} key={server.url} isActive={server?.videoQuality == watchContext.activeQuality} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}