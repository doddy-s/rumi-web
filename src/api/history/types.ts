import { Episode, Stream } from '@api/anime/types'
import { UserDto } from '@api/auth/types'
import { BaseResDto, SimplePage } from '@api/types'

export type History = {
  consumetAnime: Stream,
  consumetEpisode: Episode,
  second: number
}

export type HistoryPage = BaseResDto & {
  data: {
    user: UserDto
    historyPage: SimplePage & {
      list:  History[]
    }
  }
}

