import Slider, { Settings } from 'react-slick'
import { AnimeCard } from './AnimeCard'
import { Anime } from '@api/anime/types'

export function MainBannerCarousel({ updateBanner, animes }: { updateBanner: (index: number) => void, animes: Anime[] }) {
  const settings: Settings = {
    centerMode: true,
    infinite: true,
    centerPadding: '2rem',
    slidesToShow: 4,
    speed: 200,
    accessibility: true,
    afterChange: function (index) {
      updateBanner(index)
    },
    focusOnSelect: true,
  }
  return (
    <>
      <div className="h-[12rem] w-[36rem]">
        <Slider {...settings}>
          {animes?.map((anime) => (
            <AnimeCard anime={anime} key={anime?.malId} />
          ))}
        </Slider>
      </div>
    </>
  )
}