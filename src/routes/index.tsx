import { getCurrentSeasonAnimes } from '@api/anime/getCurrentSeasonAnimes'
import { getAuthenticatedUserHistory } from '@api/history/getAuthenticatedUserHistory'
import { AnimeCarousel } from '@components/AnimeCarousel'
import { HistoryCarousel } from '@components/HistoryCarousel'
import { MainBannerOverlay } from '@components/MainBannerOverlay'
import { AuthContext } from '@contexts/AuthContext'
import { createFileRoute, Link } from '@tanstack/react-router'
import { useContext } from 'react'

export const Route = createFileRoute('/')({
  component: Root
})

function Root() {
  const authContext = useContext(AuthContext)
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <MainBannerOverlay />
      <div className="h-auto w-screen bg-black flex flex-col justify-center items-start">
        <AnimeCarousel query={getCurrentSeasonAnimes} title="Current Season Animes" isInfinite={true} />
        {authContext.isAuthenticated ? (
          <>
            <HistoryCarousel query={getAuthenticatedUserHistory} title="Your watch history" isInfinite={false} />
          </>
        ) : (
          <>
            <div className="place-self-center">
              <Link to="/login" className="text-green-400">Login</Link> or <Link to="/register" className="text-green-400">Register</Link> to use history feature!
            </div>
          </>
        )}
      </div>
    </main>
  )
}