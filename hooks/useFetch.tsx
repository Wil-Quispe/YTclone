import { SearchVideoInterface } from '../Interfaces'

interface Search {
  search: string
  maxResults?: number
}

const Fetch = () => {
  const doFetch = async ({
    search,
    maxResults,
  }: Search): Promise<SearchVideoInterface> => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyCmG8jzvCF6_3kPYRcGzSF9b2L-LF6j68s&maxResults=${
          maxResults || 10
        }&type=video&q=${search}`,
      )
      return await res.json()
    } catch (e) {
      throw new Error(`some error ${e}`)
    }
  }

  return [doFetch]
}

export default Fetch
