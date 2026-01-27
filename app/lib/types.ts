export type MatchStatus = 'Live' | 'Post' | 'Pre' | 'Preview' | 'Completed'

export interface TeamInfo {
  f: string  // Full name
  n: string  // Short name/abbreviation
  t_id?: string  // Team ID (if available)
}

export interface InningsInfo {
  sc: string  // Score
  wk: string  // Wickets
  ov: string  // Overs
}

export interface CurrentStatus {
  msg: string  // Current status message / commentary snippet
}

export interface PlayerOfTheMatch {
  id: string
  fullName: string
  captain: boolean
  keeper: boolean
}

export interface MatchData {
  match_url: string
  match_api_url?: string  // Internal upstream API URL
  start_date_time: string  // Unix timestamp (ms) or string
  match_status: MatchStatus
  match_league?: string
  match_no?: string
  venue?: string
  current_inns?: string  // 1, 2, 3, 4
  t1: TeamInfo
  t2: TeamInfo
  i1?: InningsInfo  // Innings 1 score
  i2?: InningsInfo  // Innings 2 score
  cs?: CurrentStatus  // Current status
  playersOfTheMatch?: PlayerOfTheMatch  // Player of the match (if available)
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

export type SiteName = 'Crickbuzz' | 'Espn' | 'NW18' | 'Sportskeeda' | 'CricketLineGuru'
