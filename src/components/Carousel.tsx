import Slider, { Settings } from 'react-slick'
import { AnimePage } from '@api/anime/types'
import { AnimeCardLarge } from './AnimeCardLarge'
import { useQuery } from '@tanstack/react-query'

export function Carousel({ query, title, isInfinite }: { query: () => Promise<AnimePage>, title: string, isInfinite: boolean }) {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['animes'],
    queryFn: query,
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  const settings: Settings = {
    centerMode: false,
    infinite: isInfinite,
    slidesToShow: 8,
    speed: 200,
    swipeToSlide: true,
    focusOnSelect: true,
  }
  return (
    <>
      <div className="h-[24rem] w-auto px-20">
        <h1 className="text-xl pb-4">{title}</h1>
        <Slider {...settings}>
          {data.data.list.map((anime) => (
            <AnimeCardLarge anime={anime} key={anime.malId} />
          ))}
        </Slider>
      </div>
    </>
  )
}