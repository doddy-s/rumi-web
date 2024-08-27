import { Anime } from '@api/anime/types'
import { useState } from 'react'

export function MainBannerDetail({ anime }: { anime: Anime }) {
  const [isReadMore, setIsReadMore] = useState(true)

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore)
  }

  return (
    <>
      <div className="flex-col w-1/3">
        <h1 className="text-4xl font-bold my-4">{anime.englishTitle}</h1>
        <div>
          {isReadMore ? anime.description.slice(0, 320) : anime.description}
          {anime.description.length > 320 && (
            <span onClick={toggleReadMore}>
              {isReadMore ? ' ...Read More' : ' ...Show Less'}
            </span>
          )}
        </div>
        <h2 className="text-md font-bold my-4">{anime.releaseSeason} - {anime.releaseYear}</h2>
        <h3 className="text-md font-bold my-4">Genre, genre, genre</h3>
      </div>
    </>
  )
}