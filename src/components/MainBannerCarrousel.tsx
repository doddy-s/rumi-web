import Slider, { Settings } from 'react-slick'
import { AnimeCard } from './AnimeCard'
import { Anime } from '@api/anime/types'

export function MainBannerCarrousel({ updateBanner, animes }: { updateBanner: (index: number) => void, animes: Anime[] }) {
  const settings: Settings = {
    className: 'center',
    centerMode: true,
    infinite: true,
    centerPadding: '2rem',
    slidesToShow: 3,
    speed: 500,
    accessibility: true,
    afterChange: function (index) {
      updateBanner(index)
    }
  }
  return (
    <>
      <div className='h-[12rem] w-[42rem]'>
        <Slider {...settings}>
          {animes.map((anime) => (
            <AnimeCard anime={anime} key={anime.id} />
          ))}
        </Slider>
      </div>
    </>
  )
}