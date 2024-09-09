import { Stream } from '@api/anime/types'
import hianime from '@assets/hianime.png'
import gogoanime from '@assets/gogoanime.png'
import { Link } from '@tanstack/react-router'

export function StreamCardLarge({ stream }: { stream: Stream }) {
  return (
    <>
      <div className="h-[16rem] w-[12rem] overflow-hidden rounded-sm">
        <div className="absolute h-[16rem] w-[12rem]">
          <img
            src={stream?.image}
            alt="banner"
            className="h-[16rem] w-[12rem] object-center"
          />
        </div>
        <Link to="/watch/$consumetId" params={{ consumetId: stream?.consumetId }} search={{consumetId: ''}} className="relative flex flex-col justify-between items-start h-full w-full p-2 
        bg-none hover:bg-black bg-opacity-0 hover:bg-opacity-50 duration-100">
          <img src={stream?.provider == 'HIANIME' ? hianime : gogoanime} alt="provider-logo" className="h-10 w-10" />
          <h1>{stream?.title}</h1>
        </Link>
      </div>
    </>
  )
}