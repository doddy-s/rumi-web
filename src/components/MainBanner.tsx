import { Anime } from '@api/anime/types'

export function MainBanner({ anime }: { anime: Anime }) {
  return (
    <>
      <div className="mask-banner h-screen w-full overflow-hidden">
        <img
          src={anime.image}
          alt="banner"
          className="w-screen object-center -translate-y-[15%]"
        />
      </div>
    </>
  )
}