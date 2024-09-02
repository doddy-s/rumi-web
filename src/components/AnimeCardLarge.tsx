import { Anime } from '@api/anime/types'

export function AnimeCardLarge({ anime }: { anime: Anime }) {
  return (
    <>
      <div className="h-[16rem] w-[12rem] overflow-hidden rounded-sm">
        <img
          src={anime.image}
          alt="banner"
          className="w-full object-center"
        />
      </div>
    </>
  )
}