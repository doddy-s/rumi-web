import { MainBanner } from './MainBanner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState } from 'react'
import { MainBannerDetail } from './MainBannerDetail'
import { useQuery } from '@tanstack/react-query'
import { getTopAnimes } from '@api/anime/getCurrentSeasonAnimes'
import { MainBannerCarousel } from './MainBannerCarousel'

export function MainBannerOverlay() {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['animes'],
    queryFn: getTopAnimes,
  })

  const [currentAnimeIndex, setCurrentAnimeIndex] = useState(0)

  const setCurrentAnimeIndexFromChild = (val: number) => { setCurrentAnimeIndex(val) }

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <div className="relative h-screen">
        <MainBanner anime={data.data.list[currentAnimeIndex]} />
      </div>
      <div className="absolute h-auto w-full flex justify-between items-end bottom-20 px-20">
        <MainBannerDetail anime={data.data.list[currentAnimeIndex]} />
        <MainBannerCarousel updateBanner={setCurrentAnimeIndexFromChild} animes={data.data.list}/>
      </div>
    </>
  )
}