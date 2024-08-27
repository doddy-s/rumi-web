import { BaseResDto } from '@api/types'

export type Anime = {
  id: number
  createdDate: number
  malId: number
  englishTitle: string
  japaneseTitle: string
  rating: number
  description: string
  picture: string
  releaseYear: number
  releaseSeason: string
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