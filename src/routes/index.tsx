import { MainBannerOverlay } from '@components/MainBannerOverlay'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Root
})

function Root() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <MainBannerOverlay />
      <div className="h-screen w-full bg-cyan-200"></div>
    </main>
  )
}