import { getEpisodes } from '@api/anime/getEpisodes'
import { useQuery } from '@tanstack/react-query'
// import Slider, { Settings } from 'react-slick'
import { EpisodeButton } from './EpisodeButton'
import { useContext } from 'react'
import { WatchContext } from '@context/WatchContext'

export function EpisodeCarousel() {
  const consumetId = useContext(WatchContext)

  const { data, isPending, isError } = useQuery({
    queryKey: ['episodes', consumetId],
    queryFn: async () => await getEpisodes(consumetId)
  })

  // const settings: Settings = {
  //   centerMode: false,
  //   slidesToShow: data?.data.length || 0,
  //   speed: 200,
  //   vertical: true,
  //   focusOnSelect: true,
  //   arrows: true,
  //   dots: true
  // }

  if (isPending) return (
    <><h1 className="animate-pulse">Loading...</h1></>
  )

  if (isError) return (
    <>Error</>
  )

  return (
    <>
      {/* <Slider {...settings} className="my-8">
        {data?.data?.map((episode) => <><EpisodeButton episode={episode} /></>)}
      </Slider> */}

      <div className="h-3/4 w-full flex flex-col justify-start items-center overflow-auto my-8">
        {data?.data?.map((episode) => <><EpisodeButton episode={episode} /></>)}
      </div>
    </>
  )
}