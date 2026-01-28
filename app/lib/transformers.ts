import { type ScorecardResponse, type InningsRaw } from './types'
import { type ScoreboardData, type InningsData, type BatsmanStats, type BowlerStats, type FallOfWicket } from './scoreboard-types'

function parseScoreString(scoreStr: string): { score: number, wickets: number, overs: number } {
  // Format examples: "202-10 (69.2 Ov)", "180/4 (20.0)", "250/5"
  let score = 0
  let wickets = 0
  let overs = 0

  if (!scoreStr) return { score, wickets, overs }

  // Remove "Ov" and parens
  const cleanStr = scoreStr.replace(/[()]/g, '').replace(/Ov/g, '').trim()

  // Split score/wickets and overs
  // "202-10 69.2" or "180/4 20.0"
  const parts = cleanStr.split(' ')
  const scoreWicketsPart = parts[0]
  const oversPart = parts[1]

  if (oversPart) {
    overs = parseFloat(oversPart)
  }

  if (scoreWicketsPart) {
    // Check separator
    const separator = scoreWicketsPart.includes('-') ? '-' : '/'
    const [s, w] = scoreWicketsPart.split(separator)
    score = parseInt(s) || 0
    wickets = parseInt(w) || 0

    // Sometimes it might be wickets/score? usually score/wickets.
    // Assuming standard score/wickets or score-wickets
  }

  return { score, wickets, overs }
}

function parseExtras(extrasStr: string): { total: number, byes: number, legByes: number, wides: number, noBalls: number } {
  // Format: "(b 1, lb 2, w 1, nb 0, p 0)"
  const result = { total: 0, byes: 0, legByes: 0, wides: 0, noBalls: 0 }

  if (!extrasStr) return result

  const clean = extrasStr.replace(/[()]/g, '')
  // "b 1, lb 2, w 1, nb 0, p 0"

  // Extract total if present (not explicitly in example string, but InningsData expects it)
  // Usually extras string implies the breakdown. 
  // API example: "(b 1, lb 2, w 1, nb 0, p 0)"

  const parts = clean.split(',')

  parts.forEach(part => {
    const p = part.trim()
    const [type, val] = p.split(' ')
    const value = parseInt(val) || 0

    if (type === 'b') result.byes = value
    if (type === 'lb') result.legByes = value
    if (type === 'w') result.wides = value
    if (type === 'nb') result.noBalls = value
  })

  result.total = result.byes + result.legByes + result.wides + result.noBalls
  return result
}

function parseFallOfWickets(fowList: string[]): FallOfWicket[] {
  // Format: "10-1 (Name, 2.1)"
  if (!fowList || !Array.isArray(fowList)) return []

  return fowList.map(fow => {
    // "10-1 (Name, 2.1)"
    try {
      const [scoreWicket, details] = fow.split('(')
      const cleanScoreWicket = scoreWicket.trim()
      const cleanDetails = details.replace(')', '').trim()

      const separator = cleanScoreWicket.includes('-') ? '-' : '/'
      const [scoreStr, wicketStr] = cleanScoreWicket.split(separator)

      // Details: "Name, 2.1"
      const detailParts = cleanDetails.split(',')
      const oversStr = detailParts[detailParts.length - 1].trim() // Last part is overs
      const batsman = detailParts.slice(0, detailParts.length - 1).join(',').trim()

      return {
        score: parseInt(scoreStr) || 0,
        wickets: parseInt(wicketStr) || 0,
        batsman: batsman,
        overs: parseFloat(oversStr) || 0
      }
    } catch {
      return { score: 0, wickets: 0, batsman: '', overs: 0 }
    }
  })
}

function transformInnings(inningsRaw: InningsRaw): InningsData {
  const { score, wickets, overs } = parseScoreString(inningsRaw.inningsData.totalScore)
  const extras = parseExtras(inningsRaw.extrasEle)

  const batting: BatsmanStats[] = (inningsRaw.inningsData.batsmen || []).map(b => ({
    name: b.name,
    dismissal: b.outHow,
    runs: parseInt(b.runs) || 0,
    balls: parseInt(b.balls) || 0,
    fours: parseInt(b.fours) || 0,
    sixes: parseInt(b.sixes) || 0,
    strikeRate: parseFloat(b.strikeRate) || 0,
    isNotOut: b.outHow.toLowerCase().includes('not out')
  }))

  const bowling: BowlerStats[] = (inningsRaw.bowlingData || []).map(b => ({
    name: b.bowler,
    overs: parseFloat(b.overs) || 0,
    maidens: parseInt(b.maidens) || 0,
    runs: parseInt(b.runs) || 0,
    wickets: parseInt(b.wickets) || 0,
    economy: parseFloat(b.economy) || 0
  }))

  return {
    teamName: inningsRaw.inningsData.teamName,
    score,
    wickets,
    overs,
    extras,
    batting,
    bowling,
    fallOfWickets: parseFallOfWickets(inningsRaw.fallOfWickets),
    // Derive partnerships/powerplays if possible, or leave empty
    partnerships: [],
    powerplays: []
  }
}

export function transformScorecardData(raw: ScorecardResponse): ScoreboardData {
  const innings: InningsData[] = []

  if (raw.innings1) innings.push(transformInnings(raw.innings1))
  if (raw.innings2) innings.push(transformInnings(raw.innings2))
  if (raw.innings3) innings.push(transformInnings(raw.innings3))
  if (raw.innings4) innings.push(transformInnings(raw.innings4))

  return {
    matchTitle: raw.matchDetails.matchInfo.Match,
    venue: raw.matchDetails.matchInfo.Venue,
    date: raw.matchDetails.matchInfo.Date,
    series: raw.matchDetails.matchInfo.Series,
    tossInfo: raw.matchDetails.matchInfo.Toss,
    innings,
    result: '', // Result often in match header or calculated
    matchInfo: {
      umpires: raw.matchDetails.matchInfo.Umpires ? raw.matchDetails.matchInfo.Umpires.split(',').map(s => s.trim()) : [],
      thirdUmpire: raw.matchDetails.matchInfo["Third Umpire"],
      referee: raw.matchDetails.matchInfo["Match Referee"]
    },
    team1Squad: raw.matchDetails.team1?.playingList || [],
    team2Squad: raw.matchDetails.team2?.playingList || []
  }
}
