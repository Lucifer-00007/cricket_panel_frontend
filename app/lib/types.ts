export type MatchStatus = 'Live' | 'Post' | 'Pre'

export interface TeamInfo {
  n: string
}

export interface InningsInfo {
  sc: string
  wk: string
  ov: string
}

export interface MatchData {
  t1: TeamInfo
  t2: TeamInfo
  i1: InningsInfo
  i2: InningsInfo
  match_status: MatchStatus
  start_date_time: string
  match_url: string
}

export interface SiteData {
  [matchId: string]: MatchData
}

export interface SiteResponse {
  siteName: string
  data?: SiteData
  error?: Error
  apiUrl: string
}

export type SiteName = 'Crickbuzz' | 'Espn' | 'NW18' | 'Sportskeeda'
