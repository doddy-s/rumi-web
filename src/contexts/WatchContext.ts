import { ServerEnum, VideoQualityEnum } from '@api/anime/types'
import { createContext } from 'react'

export type WatchContext = {
  streamId: string
  activeServer: ServerEnum
  activeQuality: VideoQualityEnum
  setActiveServer: (newServer: ServerEnum) => void
  setActiveQuality: (newQuality: VideoQualityEnum) => void
}

export const WatchContext = createContext<WatchContext>({
  streamId: '', 
  activeServer: ServerEnum.VIDCLOUD, 
  activeQuality: VideoQualityEnum.FHD,
  setActiveServer: () => {},
  setActiveQuality: () => {}
})