import { ChangeEvent, useState } from 'react'
import useFetch from '../hooks/useFetch'

interface SearchInterface {
  search: string
  maxResults?: number
}

const style: React.CSSProperties = { padding: '1em', textAlign: 'center' }

const IndexPage: React.FC = (): JSX.Element => {
  const [doFetch, PlayList] = useFetch()
  const [Videos, setVideos] = useState<any>()

  const [Search, setSearch] = useState<SearchInterface>({
    search: 'none',
    maxResults: 0,
  })

  const search = async (e: any): Promise<void> => {
    e.preventDefault()
    const result: any = await doFetch(Search)
    setVideos(result.items)
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    setSearch({ ...Search, [name]: value })
  }

  // yarn create next-app --example with-typescript

  return (
    <>
      <h1>hola bros YTclone</h1>

      <form onSubmit={search}>
        <label>
          <input
            type='text'
            placeholder='buscar'
            name='search'
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type='number'
            placeholder='max resultado'
            name='maxResults'
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Buscar</button>
      </form>

      <div style={{ ...style }}>
        {Videos &&
          Videos.map((v: any, i: number) => (
            <iframe
              style={{ padding: '.8em .5em' }}
              key={i}
              src={`https://www.youtube.com/embed/${v.id.videoId}`}
              frameBorder='0'
              allowFullScreen
            ></iframe>
          ))}
      </div>

      <div style={{ ...style }}>
        {PlayList ? (
          PlayList.map((p: any, i: number) => (
            <iframe
              style={{ padding: '.8em .5em' }}
              key={i}
              src={`https://www.youtube.com/embed/videoseries?list=${p.id}`}
              frameBorder='0'
              allowFullScreen
            ></iframe>
          ))
        ) : (
          <h3>Cargando PlayList ...</h3>
        )}
      </div>
    </>
  )
}

export default IndexPage
