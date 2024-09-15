import Slider, { Settings } from 'react-slick'
import { AnimeCardLoading } from './AnimeCard.loading'

export function MainBannerCarouselLoading() {
  const settings: Settings = {
    centerMode: true,
    infinite: true,
    centerPadding: '2rem',
    slidesToShow: 4,
    speed: 200,
    accessibility: true,
    focusOnSelect: true,
  }
  return (
    <>
      <div className="h-[12rem] w-[36rem]">
        <Slider {...settings}>
          {[...Array(10)].map((item, i) => (
            <AnimeCardLoading key={i}/>
          ))}
        </Slider>
      </div>
    </>
  )
}