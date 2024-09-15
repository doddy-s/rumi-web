import Slider, { Settings } from 'react-slick'
import { useQuery } from '@tanstack/react-query'
import { AnimeCardLargeLoading } from './AnimeCardLarge.loading'
import { HistoryPage } from '@api/history/types'
import { StreamCardLarge } from './StreamCardLarge'

export function HistoryCarousel({ query, title, isInfinite }: { query: () => Promise<HistoryPage>, title: string, isInfinite: boolean }) {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['animes', title],
    queryFn: query,
  })
  
  const settings: Settings = {
    centerMode: false,
    infinite: isInfinite,
    slidesToShow: Math.min(data?.data?.historyPage?.list?.length || 8, 8),
    speed: 200,
    swipeToSlide: true,
    focusOnSelect: true,
  }

  if (isPending) {
    return (
      <>
        <div className="h-[24rem] w-full px-20">
          <h1 className="text-xl pb-4">{title}</h1>
          <Slider {...settings}>
            {[...Array(10)].map((_, i) => (
              <AnimeCardLargeLoading key={i} />
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
      <div className="h-[24rem] px-[5.5rem]" style={{width: Math.min(data?.data?.historyPage?.list?.length, 8) * 14 + 11 + 'rem'}}>
        <h1 className="text-xl pb-4">{title}</h1>
        <Slider {...settings}>
          {data?.data?.historyPage?.list?.map((history) => (
            <StreamCardLarge stream={history.consumetAnime} key={history.consumetAnime?.consumetId} episode={history.consumetEpisode}/>
          ))}
        </Slider>
      </div>
    </>
  )
}