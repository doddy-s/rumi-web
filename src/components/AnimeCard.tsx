import { Anime } from '@api/anime/types'

export function AnimeCard({ anime }: { anime: Anime }) {
  return (
    <>
      <div className="h-[10rem] w-[7.5rem] overflow-hidden rounded-sm">
        <img
          src={anime?.image}
          alt="banner"
          className="w-full object-center"
        />
      </div>
    </>
  )
}