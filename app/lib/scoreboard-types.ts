export interface BatsmanStats {
    name: string
    dismissal: string // e.g., "c Smith b Johnson", "not out", "run out"
    runs: number
    balls: number
    fours: number
    sixes: number
    strikeRate: number
    isNotOut?: boolean
}

export interface BowlerStats {
    name: string
    overs: number
    maidens: number
    runs: number
    wickets: number
    economy: number
}

export interface FallOfWicket {
    score: number
    wickets: number
    batsman: string
    overs: number
}

export interface Partnership {
    batsman1: string
    batsman2: string
    runs: number
    balls: number
}

export interface InningsData {
    teamName: string
    score: number
    wickets: number
    overs: number
    extras: {
        total: number
        byes: number
        legByes: number
        wides: number
        noBalls: number
    }
    batting: BatsmanStats[]
    bowling: BowlerStats[]
    fallOfWickets: FallOfWicket[]
    didNotBat?: string[]
    yetToBat?: string[]
    currentPartnership?: Partnership
}

export interface ScoreboardData {
    matchTitle: string
    venue: string
    date: string
    series: string
    tossInfo?: string
    innings: InningsData[]
    didNotBat?: string[]
    result?: string
    playerOfTheMatch?: string
}
