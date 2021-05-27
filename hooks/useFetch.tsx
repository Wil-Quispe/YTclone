import { useEffect, useState } from 'react'

interface Search {
  search: string
  maxResults?: number
}

const Fetch = () => {
  const [PlayList, setPlayList] = useState<any>()
  useEffect(() => {
    try {
      const getPlayList = async (): Promise<void> => {
        const res = await fetch(
          'https://www.googleapis.com/youtube/v3/playlists?part=snippet&key=AIzaSyCmG8jzvCF6_3kPYRcGzSF9b2L-LF6j68s&channelId=UC2xLpPmnDyAxvHlOTOdt_Ug&maxResults=10'
        )
        const playlists = await res.json()
        setPlayList(playlists.items)
      }
      getPlayList()
    } catch (e) {
      return e
    }
  }, [])

  const doFetch = async ({ search, maxResults }: Search): Promise<void> => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCmG8jzvCF6_3kPYRcGzSF9b2L-LF6j68s&maxResults=${
          maxResults || 10
        }&type=video&q=${search}`
      )
      const data = await res.json()
      return data
    } catch (e) {
      return e
    }
  }

  return [doFetch, PlayList]
}

export default Fetch
