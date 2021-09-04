export interface PlaylistInterface {
  kind: string
  etag: string
  pageInfo: PageInfo
  items: Item[]
}

export interface Item {
  kind: string
  etag: string
  id: string
  snippet: Snippet
}

export interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  localized: Localized
}

export interface Localized {
  title: string
  description: string
}

export interface Thumbnails {
  default: Default
  medium: Default
  high: Default
  standard?: Default
  maxres?: Default
}

export interface Default {
  url: string
  width: number
  height: number
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface SearchVideoInterface {
  kind: string
  etag: string
  nextPageToken: string
  regionCode: string
  pageInfo: PageInfo
  items: ItemSearchVideo[]
}

export interface ItemSearchVideo {
  kind: string
  etag: string
  id: ID
  snippet: Snippet
}

export interface ID {
  kind: string
  videoId: string
}

export interface Snippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: Thumbnails
  channelTitle: string
  liveBroadcastContent: string
  publishTime: string
}

export interface Thumbnails {
  default: Default
  medium: Default
  high: Default
}

export interface Default {
  url: string
  width: number
  height: number
}

export interface PageInfo {
  totalResults: number
  resultsPerPage: number
}
