import { Card, CardContent, CardTitle, ScoreHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { ModeToggle } from '@/components/mode-toggle'
import { MatchHeader } from '@/components/scoreboard/match-header'
import { BattingTable } from '@/components/scoreboard/batting-table'
import { BowlingTable } from '@/components/scoreboard/bowling-table'
import { FallOfWickets } from '@/components/scoreboard/fall-of-wickets'
import { PartnershipInfo } from '@/components/scoreboard/partnership-info'
import { Partnerships } from '@/components/scoreboard/partnerships'
import { Powerplays } from '@/components/scoreboard/powerplays'
import { MatchInfoSection } from '@/components/scoreboard/match-info-section'
import { type ScoreboardData } from '@/lib/scoreboard-types'

// Dummy data matching the reference image style
const dummyScoreboardData: ScoreboardData = {
    matchTitle: 'South Africa vs West Indies, 1st T20I',
    venue: 'SuperSport Park, Centurion',
    series: '2024 T20 World Cup',
    date: 'March 16, 2024',
    tossInfo: 'West Indies won the toss and elected to bowl first',
    result: 'South Africa won by 28 runs',
    playerOfTheMatch: 'Quinton de Kock',
    matchInfo: {
        umpires: ['Adrian Holdstock', 'Marais Erasmus'],
        thirdUmpire: 'Allahudien Paleker',
        referee: 'Andy Pycroft',
        reserve: 'Lubabalo Gcuma'
    },
    innings: [
        {
            teamName: 'South Africa',
            score: 185,
            wickets: 6,
            overs: 20.0,
            extras: {
                total: 12,
                byes: 2,
                legByes: 4,
                wides: 5,
                noBalls: 1,
            },
            batting: [
                {
                    name: 'Quinton de Kock',
                    dismissal: 'c Hope b Russell',
                    runs: 78,
                    balls: 44,
                    fours: 8,
                    sixes: 4,
                    strikeRate: 177.27,
                },
                {
                    name: 'Reeza Hendricks',
                    dismissal: 'b Shepherd',
                    runs: 12,
                    balls: 15,
                    fours: 1,
                    sixes: 0,
                    strikeRate: 80.00,
                },
                {
                    name: 'Rassie van der Dussen',
                    dismissal: 'c Pooran b Joseph',
                    runs: 32,
                    balls: 23,
                    fours: 3,
                    sixes: 1,
                    strikeRate: 139.13,
                },
                {
                    name: 'Aiden Markram',
                    dismissal: 'not out',
                    runs: 45,
                    balls: 28,
                    fours: 4,
                    sixes: 2,
                    strikeRate: 160.71,
                    isNotOut: true,
                },
                {
                    name: 'David Miller',
                    dismissal: 'run out (Russell)',
                    runs: 8,
                    balls: 6,
                    fours: 1,
                    sixes: 0,
                    strikeRate: 133.33,
                },
                {
                    name: 'Heinrich Klaasen',
                    dismissal: 'not out',
                    runs: 10,
                    balls: 4,
                    fours: 0,
                    sixes: 1,
                    strikeRate: 250.00,
                    isNotOut: true,
                },
            ],
            bowling: [
                {
                    name: 'Alzarri Joseph',
                    overs: 4,
                    maidens: 0,
                    runs: 38,
                    wickets: 1,
                    economy: 9.50,
                },
                {
                    name: 'Romario Shepherd',
                    overs: 4,
                    maidens: 0,
                    runs: 35,
                    wickets: 1,
                    economy: 8.75,
                },
                {
                    name: 'Andre Russell',
                    overs: 4,
                    maidens: 0,
                    runs: 42,
                    wickets: 1,
                    economy: 10.50,
                },
                {
                    name: 'Akeal Hosein',
                    overs: 4,
                    maidens: 0,
                    runs: 28,
                    wickets: 0,
                    economy: 7.00,
                },
                {
                    name: 'Gudakesh Motie',
                    overs: 4,
                    maidens: 0,
                    runs: 30,
                    wickets: 0,
                    economy: 7.50,
                },
            ],
            fallOfWickets: [
                { score: 25, wickets: 1, batsman: 'Hendricks', overs: 4.2 },
                { score: 112, wickets: 2, batsman: 'de Kock', overs: 12.4 },
                { score: 138, wickets: 3, batsman: 'van der Dussen', overs: 15.3 },
                { score: 155, wickets: 4, batsman: 'Miller', overs: 17.5 },
            ],
            yetToBat: ['Wiaan Mulder', 'Kagiso Rabada', 'Keshav Maharaj', 'Anrich Nortje', 'Tabraiz Shamsi'],
            currentPartnership: {
                batsman1: 'Aiden Markram',
                batsman2: 'Heinrich Klaasen',
                runs: 30,
                balls: 16
            },
            partnerships: [
                { wicket: 1, batsman1: 'Quinton de Kock', batsman2: 'Reeza Hendricks', runs: 25, balls: 25 },
                { wicket: 2, batsman1: 'Quinton de Kock', batsman2: 'Rassie van der Dussen', runs: 87, balls: 54 },
                { wicket: 3, batsman1: 'Aiden Markram', batsman2: 'Rassie van der Dussen', runs: 26, balls: 18 },
                { wicket: 4, batsman1: 'Aiden Markram', batsman2: 'David Miller', runs: 17, balls: 14 },
                { wicket: 0, batsman1: 'Aiden Markram', batsman2: 'Heinrich Klaasen', runs: 30, balls: 16 }
            ],
            powerplays: [
                { overs: '0.1-6.0', runs: 52, wickets: 1 },
                { overs: '6.1-10.0', runs: 48, wickets: 0 },
                { overs: '16.1-20.0', runs: 53, wickets: 3 }
            ]
        },
        {
            teamName: 'West Indies',
            score: 157,
            wickets: 9,
            overs: 20.0,
            extras: {
                total: 8,
                byes: 1,
                legByes: 3,
                wides: 3,
                noBalls: 1,
            },
            batting: [
                {
                    name: 'Brandon King',
                    dismissal: 'lbw b Rabada',
                    runs: 5,
                    balls: 8,
                    fours: 0,
                    sixes: 0,
                    strikeRate: 62.50,
                },
                {
                    name: 'Kyle Mayers',
                    dismissal: 'c de Kock b Nortje',
                    runs: 28,
                    balls: 22,
                    fours: 4,
                    sixes: 1,
                    strikeRate: 127.27,
                },
                {
                    name: 'Nicholas Pooran',
                    dismissal: 'c Miller b Maharaj',
                    runs: 52,
                    balls: 35,
                    fours: 5,
                    sixes: 3,
                    strikeRate: 148.57,
                },
                {
                    name: 'Rovman Powell',
                    dismissal: 'c Markram b Parnell',
                    runs: 18,
                    balls: 15,
                    fours: 1,
                    sixes: 1,
                    strikeRate: 120.00,
                },
                {
                    name: 'Andre Russell',
                    dismissal: 'b Rabada',
                    runs: 24,
                    balls: 16,
                    fours: 1,
                    sixes: 2,
                    strikeRate: 150.00,
                },
                {
                    name: 'Jason Holder',
                    dismissal: 'c Klaasen b Nortje',
                    runs: 12,
                    balls: 11,
                    fours: 0,
                    sixes: 1,
                    strikeRate: 109.09,
                },
                {
                    name: 'Romario Shepherd',
                    dismissal: 'not out',
                    runs: 10,
                    balls: 9,
                    fours: 1,
                    sixes: 0,
                    strikeRate: 111.11,
                    isNotOut: true,
                },
                {
                    name: 'Akeal Hosein',
                    dismissal: 'run out (Markram)',
                    runs: 3,
                    balls: 3,
                    fours: 0,
                    sixes: 0,
                    strikeRate: 100.00,
                },
                {
                    name: 'Alzarri Joseph',
                    dismissal: 'not out',
                    runs: 0,
                    balls: 1,
                    fours: 0,
                    sixes: 0,
                    strikeRate: 0.00,
                    isNotOut: true,
                },
            ],
            bowling: [
                {
                    name: 'Kagiso Rabada',
                    overs: 4,
                    maidens: 0,
                    runs: 32,
                    wickets: 2,
                    economy: 8.00,
                },
                {
                    name: 'Anrich Nortje',
                    overs: 4,
                    maidens: 0,
                    runs: 28,
                    wickets: 2,
                    economy: 7.00,
                },
                {
                    name: 'Wayne Parnell',
                    overs: 4,
                    maidens: 0,
                    runs: 35,
                    wickets: 1,
                    economy: 8.75,
                },
                {
                    name: 'Keshav Maharaj',
                    overs: 4,
                    maidens: 0,
                    runs: 30,
                    wickets: 1,
                    economy: 7.50,
                },
                {
                    name: 'Aiden Markram',
                    overs: 4,
                    maidens: 0,
                    runs: 24,
                    wickets: 0,
                    economy: 6.00,
                },
            ],
            fallOfWickets: [
                { score: 12, wickets: 1, batsman: 'King', overs: 2.3 },
                { score: 48, wickets: 2, batsman: 'Mayers', overs: 7.1 },
                { score: 98, wickets: 3, batsman: 'Pooran', overs: 12.4 },
                { score: 125, wickets: 4, batsman: 'Powell', overs: 15.2 },
                { score: 142, wickets: 5, batsman: 'Russell', overs: 17.3 },
                { score: 155, wickets: 6, batsman: 'Holder', overs: 19.1 },
                { score: 157, wickets: 7, batsman: 'Hosein', overs: 19.5 },
            ],
            yetToBat: ['Gudakesh Motie'],
            currentPartnership: {
                batsman1: 'Romario Shepherd',
                batsman2: 'Alzarri Joseph',
                runs: 2,
                balls: 4
            },
            partnerships: [
                { wicket: 1, batsman1: 'Brandon King', batsman2: 'Kyle Mayers', runs: 12, balls: 14 },
                { wicket: 2, batsman1: 'Kyle Mayers', batsman2: 'Nicholas Pooran', runs: 36, balls: 28 },
                { wicket: 3, batsman1: 'Nicholas Pooran', batsman2: 'Rovman Powell', runs: 50, balls: 32 },
                { wicket: 4, batsman1: 'Rovman Powell', batsman2: 'Andre Russell', runs: 27, balls: 17 },
                { wicket: 5, batsman1: 'Rovman Powell', batsman2: 'Jason Holder', runs: 17, balls: 12 },
                { wicket: 6, batsman1: 'Jason Holder', batsman2: 'Akeal Hosein', runs: 13, balls: 10 },
                { wicket: 7, batsman1: 'Romario Shepherd', batsman2: 'Akeal Hosein', runs: 2, balls: 4 },
                { wicket: 0, batsman1: 'Romario Shepherd', batsman2: 'Alzarri Joseph', runs: 2, balls: 4 }
            ],
            powerplays: [
                { overs: '0.1-6.0', runs: 45, wickets: 2 },
                { overs: '6.1-10.0', runs: 42, wickets: 1 },
                { overs: '16.1-20.0', runs: 35, wickets: 4 }
            ]
        },
    ],
}

export default function ScoreboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6 pb-20">
                {/* Header */}
                <header className="flex items-center gap-4 pb-4 border-b border-border/40 dark:border-border/30">
                    <h1 className="text-2xl font-semibold text-foreground dark:text-white/95">Match Scoreboard</h1>
                    <div className="ml-auto flex items-center gap-4">
                        <ModeToggle />
                    </div>
                </header>

                {/* Match Header */}
                <MatchHeader
                    matchTitle={dummyScoreboardData.matchTitle}
                    venue={dummyScoreboardData.venue}
                    date={dummyScoreboardData.date}
                    series={dummyScoreboardData.series}
                    tossInfo={dummyScoreboardData.tossInfo}
                    result={dummyScoreboardData.result}
                />

                {/* Innings Cards */}
                {dummyScoreboardData.innings.map((innings, index) => (
                    <Card key={index} className="border border-border/50 dark:border-border/30 shadow-lg dark:shadow-2xl overflow-hidden bg-card">
                        <ScoreHeader className="px-6 py-4 bg-muted/60 dark:bg-white/[0.08]">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg font-bold text-foreground dark:text-white/95">
                                    {innings.teamName} Innings
                                </CardTitle>
                                <Badge variant="default" className="px-4 py-2 text-base font-bold">
                                    {innings.score}/{innings.wickets} ({innings.overs} ov)
                                </Badge>
                            </div>
                        </ScoreHeader>
                        <Separator className="h-px bg-border/60 dark:bg-border/40" />

                        <CardContent className="p-0">
                            {/* Batting Section */}
                            <div className="px-6 py-4 space-y-3">
                                <BattingTable batsmen={innings.batting} />

                                <Separator className="h-px bg-border/50 dark:bg-border/30" />

                                {/* Current Partnership */}
                                {innings.currentPartnership && (
                                    <>
                                        <PartnershipInfo partnership={innings.currentPartnership} />
                                        <Separator className="h-px bg-border/50 dark:bg-border/30" />
                                    </>
                                )}

                                {/* Extras */}
                                <div className="text-sm text-muted-foreground dark:text-white/70 my-2.5">
                                    <span className="font-semibold text-foreground dark:text-white/90">Extras:</span>{' '}
                                    {innings.extras.total} (b {innings.extras.byes}, lb {innings.extras.legByes}, w {innings.extras.wides}, nb {innings.extras.noBalls})
                                </div>

                                <Separator className="h-px bg-border/50 dark:bg-border/30" />

                                {/* Total */}
                                <div className="text-sm text-muted-foreground dark:text-white/70 my-2.5">
                                    <span className="font-semibold text-foreground dark:text-white/90">Total:</span>{' '}
                                    {innings.score}/{innings.wickets} ({innings.overs} ov)
                                </div>

                                {innings.yetToBat && innings.yetToBat.length > 0 && (
                                    <>
                                        <Separator className="h-px bg-border/50 dark:bg-border/30" />
                                        {/* Yet to Bat */}
                                        <div className="text-sm text-muted-foreground dark:text-white/70 my-2.5">
                                            <span className="font-semibold text-foreground dark:text-white/90">Yet to Bat:</span>{' '}
                                            {innings.yetToBat.join(', ')}
                                        </div>
                                    </>
                                )}

                                {innings.didNotBat && innings.didNotBat.length > 0 && (
                                    <>
                                        <Separator className="h-px bg-border/50 dark:bg-border/30" />
                                        {/* Did Not Bat */}
                                        <div className="text-sm text-muted-foreground dark:text-white/70 my-2.5">
                                            <span className="font-semibold text-foreground dark:text-white/90">Did Not Bat:</span>{' '}
                                            {innings.didNotBat.join(', ')}
                                        </div>
                                    </>
                                )}

                                {/* Partnerships */}
                                {innings.partnerships && innings.partnerships.length > 0 && (
                                    <>
                                        <Separator className="h-px bg-border/50 dark:bg-border/30" />
                                        <Partnerships partnerships={innings.partnerships} />
                                    </>
                                )}

                                {/* Powerplays */}
                                {innings.powerplays && innings.powerplays.length > 0 && (
                                    <>
                                        <Separator className="h-px bg-border/50 dark:bg-border/30" />
                                        <Powerplays powerplays={innings.powerplays} />
                                    </>
                                )}
                            </div>

                            <Separator className="h-px bg-border/60 dark:bg-border/40" />

                            {/* Bowling Section */}
                            <div className="px-6 py-4 space-y-3">
                                <BowlingTable bowlers={innings.bowling} />

                                <Separator className="h-px bg-border/50 dark:bg-border/30" />

                                {/* Fall of Wickets */}
                                <FallOfWickets wickets={innings.fallOfWickets} />
                            </div>

                        </CardContent>
                    </Card>
                ))}

                {/* Player of the Match */}
                {dummyScoreboardData.playerOfTheMatch && (
                    <Card className="border border-border/50 dark:border-border/30 shadow-sm bg-card">
                        <CardContent className="p-6">
                            <p className="text-sm">
                                <span className="font-bold text-foreground dark:text-white/90">Player of the Match:</span>{' '}
                                <span className="text-primary font-semibold">{dummyScoreboardData.playerOfTheMatch}</span>
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Match Information */}
                {dummyScoreboardData.matchInfo && (
                    <MatchInfoSection matchInfo={dummyScoreboardData.matchInfo} />
                )}
            </div>
        </div>
    )
}
