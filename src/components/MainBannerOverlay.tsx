import { MainBanner } from './MainBanner'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useState } from 'react'
import { MainBannerDetail } from './MainBannerDetail'
import { useQuery } from '@tanstack/react-query'
import { getTopAnimes } from '@api/anime/getCurrentSeasonAnimes'
import { MainBannerCarousel } from './MainBannerCarousel'
import { MainBannerLoading } from './MainBanner.loading'
import { MainBannerDetailLoading } from './MainBannerDetail.loading'
import { MainBannerCarouselLoading } from './MainBannerCarousel.loading'

export function MainBannerOverlay() {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['animes'],
    queryFn: async () => await getTopAnimes(),
  })

  const [currentAnimeIndex, setCurrentAnimeIndex] = useState(0)

  const setCurrentAnimeIndexFromChild = (val: number) => { setCurrentAnimeIndex(val) }

  if (isPending) {
    return (
      <>
        <div className="relative h-screen">
          <MainBannerLoading />
        </div>
        <div className="absolute h-auto w-full flex justify-between items-end bottom-20 px-20">
          <MainBannerDetailLoading />
          <MainBannerCarouselLoading />
        </div>
      </>
    )
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <div className="relative h-screen">
        <MainBanner anime={data?.data?.list[currentAnimeIndex]} />
      </div>
      <div className="absolute h-auto w-full flex justify-between items-end bottom-20 px-20">
        <MainBannerDetail anime={data?.data?.list[currentAnimeIndex]} />
        <MainBannerCarousel updateBanner={setCurrentAnimeIndexFromChild} animes={data?.data?.list}/>
      </div>
    </>
  )
}