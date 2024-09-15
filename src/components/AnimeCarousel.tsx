import Slider, { Settings } from 'react-slick'
import { AnimePage } from '@api/anime/types'
import { AnimeCardLarge } from './AnimeCardLarge'
import { useQuery } from '@tanstack/react-query'
import { AnimeCardLargeLoading } from './AnimeCardLarge.loading'

export function AnimeCarousel({ query, title, isInfinite }: { query: () => Promise<AnimePage>, title: string, isInfinite: boolean }) {
  const settings: Settings = {
    centerMode: false,
    infinite: isInfinite,
    slidesToShow: 8,
    speed: 200,
    swipeToSlide: true,
    focusOnSelect: true,
  }

  const { data, isPending, error, isError } = useQuery({
    queryKey: ['animes', title],
    queryFn: query,
  })

  if (isPending) {
    return (
      <>
        <div className="h-[24rem] w-full px-20">
          <h1 className="text-xl pb-4">{title}</h1>
          <Slider {...settings}>
            {[...Array(10)].map((_, i) => (
              <AnimeCardLargeLoading key={i}/>
            ))}
          </Slider>
        </div>
      </>
    )
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <div className="h-[24rem] w-full px-[5.5rem]">
        <h1 className="text-xl pb-4">{title}</h1>
        <Slider {...settings}>
          {data?.data?.list.map((anime) => (
            <AnimeCardLarge anime={anime} key={anime?.title} /> 
          ))}
        </Slider>
      </div>
    </>
  )
}