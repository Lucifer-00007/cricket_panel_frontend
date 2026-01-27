import { type SiteData, type SiteResponse, type SiteName } from './types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || ''

const SITE_ENDPOINTS: Record<SiteName, string> = {
  Crickbuzz: `${API_BASE_URL}/cbz`,
  Espn: `${API_BASE_URL}/espn`,
  NW18: `${API_BASE_URL}/nw18`,
  Sportskeeda: `${API_BASE_URL}/sk`,
  CricketLineGuru: `${API_BASE_URL}/clg`,
}

export async function fetchMatchData(
  siteName: SiteName
): Promise<SiteResponse> {
  const apiUrl = SITE_ENDPOINTS[siteName]

  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 60 }, // 60 seconds for more real-time updates
      headers: {
        'Accept': 'application/json',
      }
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch ${siteName} data: HTTP ${response.status}`)
    }

    const data: SiteData = await response.json()
    return { siteName, data, apiUrl }
  } catch (error) {
    console.error(`Error fetching ${siteName} matches:`, error)
    return {
      siteName,
      error: error instanceof Error ? error : new Error('Unknown error occurred'),
      apiUrl
    }
  }
}

export async function fetchAllMatches(): Promise<SiteResponse[]> {
  const sites: SiteName[] = ['Crickbuzz', 'Espn', 'NW18', 'Sportskeeda', 'CricketLineGuru']
  return Promise.all(sites.map(fetchMatchData))
}
