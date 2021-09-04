import { ChangeEvent, CSSProperties, FormEvent, useState } from 'react'
import useFetch from '../hooks/useFetch'
import Head from 'next/head'
import { GetStaticProps } from 'next'
import { Item, ItemSearchVideo, PlaylistInterface } from './../Interfaces/index'
interface SearchInterface {
  search: string
  maxResults?: number
}

const style: CSSProperties = { padding: '1em', textAlign: 'center' }

const IndexPage = ({ PlayList }: { PlayList: PlaylistInterface }) => {
  const [doFetch] = useFetch()
  const [Videos, setVideos] = useState<ItemSearchVideo[]>()

  const [Search, setSearch] = useState<SearchInterface>({
    search: 'none',
    maxResults: 0,
  })

  const search = async (e: FormEvent): Promise<void> => {
    e.preventDefault()
    const result = await doFetch(Search)
    setVideos(result.items)
  }

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    setSearch({ ...Search, [name]: value })
  }

  return (
    <>
      <Head>
        <title>YT clone</title>
        <link rel="icon" href="/youtube.svg" />
      </Head>
      <h1>hola bros YTclone hola comunidad de WilCodee</h1>

      <form onSubmit={search}>
        <label>
          <input
            type="text"
            placeholder="buscar"
            name="search"
            onChange={handleChange}
          />
        </label>
        <label>
          <input
            type="number"
            placeholder="max resultado"
            name="maxResults"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Buscar</button>
      </form>

      <div style={{ ...style }}>
        {Videos &&
          Videos.map((v: ItemSearchVideo) => (
            <iframe
              style={{ padding: '.8em .5em' }}
              key={v.id.videoId}
              src={`https://www.youtube.com/embed/${v.id.videoId}`}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ))}
      </div>

      <div style={{ ...style }}>
        {PlayList ? (
          PlayList.items.map((p: Item) => (
            <iframe
              style={{ padding: '.8em .5em' }}
              key={p.id}
              src={`https://www.youtube.com/embed/videoseries?list=${p.id}`}
              frameBorder="0"
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

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    'https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=AIzaSyCmG8jzvCF6_3kPYRcGzSF9b2L-LF6j68s&channelId=UC2xLpPmnDyAxvHlOTOdt_Ug&maxResults=10',
  )
  const PlayList = await res.json()

  return {
    props: { PlayList },
  }
}

export default IndexPage
