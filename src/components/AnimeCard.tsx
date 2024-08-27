import { Anime } from '@api/anime/types'

export function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <>
      <div className="mask-banner h-[12rem] w-[9rem] overflow-hidden rounded-sm">
        <img
          src={anime.picture}
          alt="banner"
          className="w-full object-center"
        />
      </div>
    </>
  )
}