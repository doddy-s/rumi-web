import { BaseResDto, SimplePage } from '@api/types'

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
  data: {
    anime: Anime
    streams: Stream[]
  }
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
    stream: Stream
    episodes: Episode[]
  }
}

export enum VideoQualityEnum {
  NHD = 'NHD',
  FWVGA = 'FWVGA',
  HD = 'HD',
  FHD = 'FHD'
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
  data: {
    episode: Episode
    servers: Server[]
  }
}