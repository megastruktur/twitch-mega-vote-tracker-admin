import { PUBLIC_CORS_PROXY_URL } from "$env/static/public";
import type { GamesResponse } from "./pocketbase-types";

export async function getSteamGameData(steamAppId: number) {

  const language = "russian"

  const steamUrl = `${PUBLIC_CORS_PROXY_URL}/https://store.steampowered.com/api/appdetails?appids=${steamAppId}&l=${language}`
  // Fetch the data from url
  try {
    const response = await fetch(steamUrl);
    const steamGameDataResponse = await response.json()

    if (steamGameDataResponse[steamAppId] !== undefined) {
      const steamGameData = steamGameDataResponse[steamAppId].data
      if (steamGameData) {
        return steamGameData
      }
      else {
        throw new Error(`Failed to get steam game data for ${steamAppId}`)
      }
    }
    else {
      throw new Error(`Failed to get steam game data for ${steamAppId}`)
    }

  } catch (error) {
    console.error(error);
    throw new Error(`Failed to get steam game data for ${steamAppId}`)
  }
}

export function getGameAppIdFromGameResponse(game: GamesResponse): number {
  // Parse the URL and get the second path
  return getGameAppId(game.steamLink)
}

export function getGameAppId(gameUrl: string): number {
  const gameId = new URL(gameUrl).pathname?.split("/")[2]
  if (gameId !== undefined) {
    return parseInt(gameId)
  }
  else {
    return 0
  }
}
