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