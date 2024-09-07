import Slider, { Settings } from 'react-slick'
import { StreamList } from '@api/anime/types'
import { useQuery } from '@tanstack/react-query'
import { AnimeCardLargeLoading } from './AnimeCardLarge.loading'
import { StreamCardLarge } from './StreamCardLarge'

export function StreamCarousel({ query, title, isInfinite, malId }: { query: (malId: number) => Promise<StreamList>, title: string, isInfinite: boolean, malId: number }) {
  
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['streams', malId],
    queryFn: async () => await query(malId),
  })
  
  const settings: Settings = {
    centerMode: false,
    infinite: isInfinite,
    slidesToShow: data?.data.length || 6,
    slidesToScroll: 1,
    speed: 200,
    swipeToSlide: true,
    // variableWidth: true
    arrows: false
  }
  
  if (isPending) {
    return (
      <>
        <div className="h-[24rem] w-auto px-20">
          <h1 className="text-xl pb-4">{title}</h1>
          <Slider {...settings}>
            {[...Array(10)].map(() => (
              <AnimeCardLargeLoading />
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
      <div className="h-[24rem] px-20" style={{width: data.data.length * 16 + 'rem'}}>
        <h1 className="text-xl pb-4">{title}</h1>
        <Slider {...settings}>
          {data?.data?.map((stream) => (
            <StreamCardLarge stream={stream} key={stream.consumetId} />
          ))}
          {/* <h1>1</h1>
          <h1>2</h1>
          <h1>3</h1> */}
        </Slider>
      </div>
    </>
  )
}