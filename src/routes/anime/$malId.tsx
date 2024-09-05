import { getOneAnime } from '@api/anime/getOneAnime'
import { AnimeCardLarge } from '@components/AnimeCardLarge'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/anime/$malId')({
  component: Anime
})

function Anime() {
  const { malId }: { malId: number } = Route.useParams()
  const { data, isPending, error, isError } = useQuery({
    queryKey: ['animes'],
    queryFn: () => getOneAnime(malId),
  })

  if (isPending) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center gap-12">
        <AnimeCardLarge anime={data.data} />
        <table className="border-collapse w-1/2 border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800 text-sm shadow-sm">
          <tbody>
            <tr>
              <td>Mal ID</td>
              <td>{data.data.malId}</td>
            </tr>
            <tr>
              <td>Title</td>
              <td>{data.data.title}</td>
            </tr>
            <tr>
              <td>English Title</td>
              <td>{data.data.englishTitle}</td>
            </tr>
            <tr>
              <td>Japanese Title</td>
              <td>{data.data.japaneseTitle}</td>
            </tr>
            <tr>
              <td>Score</td>
              <td>{data.data.score}</td>
            </tr>
            <tr>
              <td>Year</td>
              <td>{data.data.year}</td>
            </tr>
            <tr>
              <td>Season</td>
              <td>{data.data.season}</td>
            </tr>
            <tr>
              <td>Genres</td>
              <td>
                <ul>
                  {data.data.genres.map(genre => (
                    <li key={genre.malId}>{genre.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
            <tr>
              <td>Studios</td>
              <td>
                <ul>
                  {data.data.studios.map(studio => (
                    <li key={studio.malId}>{studio.name}</li>
                  ))}
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}