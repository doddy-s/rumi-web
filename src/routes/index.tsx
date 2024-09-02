import { getCurrentSeasonAnimes, getTopAnimes } from '@api/anime/getCurrentSeasonAnimes'
import { Carousel } from '@components/Carousel'
import { MainBannerOverlay } from '@components/MainBannerOverlay'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Root
})

function Root() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between overflow-hidden">
      <MainBannerOverlay />
      <div className="h-auto w-screen bg-black flex-col justify-center items-center m-8">
        <Carousel query={getCurrentSeasonAnimes} title='Current Season Animes'/>
        <Carousel query={getTopAnimes} title='Your watch history'/>
      </div>
    </main>
  )
}