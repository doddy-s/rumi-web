import { Anime } from '@api/anime/types'
import { useState } from 'react'

export function MainBannerDetail({ anime }: { anime: Anime }) {
  const [isReadMore, setIsReadMore] = useState(true)

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  if(anime == undefined) return (
    <></>
  )

  return (
    <>
      <div className="flex-col w-1/3">
        <h1 className="text-4xl font-bold my-4">{anime.title}</h1>
        <div>
          {isReadMore ? anime.synopsis.slice(0, 320) : anime.synopsis}
          {anime.synopsis.length > 320 && (
            <span onClick={toggleReadMore}>
              {isReadMore ? ' ...Read More' : ' ...Show Less'}
            </span>
          )}
        </div>
        <h2 className="text-md my-4">{anime.season} - {anime.year}</h2>
        <h3 className="text-md my-4">
          {anime.genres.map((genre, index) => (
            <a key={genre.malId} href={'/genre/' + genre.malId}>{genre.name}{index < anime.genres.length - 1 && ', '}</a>
          ))}
        </h3>
        <h3 className="text-md my-4">
          {anime.studios.map((studio, index) => (
            <a key={studio.malId}>{studio.name}{index < anime.studios.length - 1 && ', '}</a>
          ))}
        </h3>
      </div>
    </>
  )
}