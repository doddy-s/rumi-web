import { BaseResDto } from '@api/types'

export type Anime = {
  malId: number
  title: string
  englishTitle: string
  japaneseTitle: string
  score: number
  synopsis: string
  image: string
  year: number
  season: string
  genres: Genre[]
  studios: Studio[]
}

export type Genre = {
  malId: number
  name: string
}

export type Studio = {
  malId: number
  name: string
}

export type AnimePage = BaseResDto & {
  data: SimplePage & {
    list: Anime[]
  }
}

export type SimplePage = {
  maxPage: number
  currentPage: number
  hasNextPage: boolean
}

export type AnimeRes = BaseResDto & {
  data: Anime
}

export type Stream = {
  consumetId: string
  title: string
  image: string
  provider: string
}

export type StreamList = BaseResDto & {
  data: Stream[]
}

export type Episode = {
  consumetId: string
  number: number
  title: string
}

export enum ProviderEnum {
  HIANIME,
  GOGOANIME
}

export type EpisodeList = BaseResDto & {
  data: {
    provider: ProviderEnum
    list: Episode[]
  }
}

export enum VideoQualityEnum {
  NHD,
  FWVGA,
  HD,
  FHD
}

export enum ServerEnum {
  GOGOCDN = 'GOGOCDN',
  STREAMSB = 'STREAMSB',
  VIDSTREAMING = 'VIDSTREAMING',
  VIDCLOUD = 'VIDCLOUD',
  STREAMTAPE = 'STREAMTAPE'
}

export type Server = {
  url: string
  videoQuality: VideoQualityEnum
  server: ServerEnum
}

export type ServerList = BaseResDto & {
  data: Server[]
}