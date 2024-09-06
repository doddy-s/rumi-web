import { Anime } from '@api/anime/types'
import { Link } from '@tanstack/react-router'

export function AnimeCardLarge({ anime }: { anime: Anime }) {
  return (
    <>
      <div className="h-[16rem] w-[12rem] overflow-hidden rounded-sm">
        <div className="absolute h-full w-full">
          <img
            src={anime.image}
            alt="banner"
            className="h-[16rem] w-[12rem] object-center"
          />
        </div>
        <Link to="/stream/$malId" params={{ malId: anime.malId.toString() }} className="relative flex flex-col justify-between items-start h-full w-full p-2 
        bg-none hover:bg-black bg-opacity-0 hover:bg-opacity-50 duration-100">
          <h1>{anime.title}</h1>
        </Link>
      </div>
    </>
  )
}