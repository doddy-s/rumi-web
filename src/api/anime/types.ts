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
  consumetId: string,
  title: string
}

export type EpisodeList = BaseResDto & {
  data: Episode[]
}