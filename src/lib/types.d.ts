export type SteamGameData = {
  name: string
  detailed_description: string
  short_description: string
  header_image: string
  categories: Category[]
  genres: Genre[]
  screenshots: Screenshot[]
}

export type Genre = {
  id: number
  description: string
}

export type Category = {
  id: number
  description: string
}

export type Metacritic = {
  score: number
  url: string
}

export type Screenshot = {
  id: number,
  path_thumbnail: string,
  path_full: string
}
