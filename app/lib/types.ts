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

// Scorecard API Types

export interface BatsmanRaw {
  name: string
  runs: string
  balls: string
  fours: string
  sixes: string
  strikeRate: string
  outHow: string
}

export interface BowlerRaw {
  bowler: string
  overs: string
  maidens: string
  runs: string
  wickets: string
  economy: string
}

export interface InningsRaw {
  inningsData: {
    teamName: string
    totalScore: string
    batsmen: BatsmanRaw[]
  }
  bowlingData: BowlerRaw[]
  fallOfWickets: string[]
  extrasEle: string
}

export interface MatchInfoRaw {
  Match: string
  Series: string
  Date: string
  Venue: string
  Toss: string
  Umpires: string
  "Third Umpire"?: string
  "Match Referee"?: string
}

export interface TeamSquadRaw {
  teamName: string
  playingList: string[]
}

export interface MatchDetailsRaw {
  matchInfo: MatchInfoRaw
  team1: TeamSquadRaw
  team2: TeamSquadRaw
}

export interface ScorecardResponse {
  innings1?: InningsRaw
  innings2?: InningsRaw
  innings3?: InningsRaw
  innings4?: InningsRaw
  matchDetails: MatchDetailsRaw
}