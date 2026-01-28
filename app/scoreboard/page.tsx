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
import { MATCH_DATA } from '@/constants/match-data'

export default function ScoreboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6 pb-20">
                {/* Header */}
                <header className="flex items-center gap-4 pb-4 border-b border-border/40 dark:border-border/30">
                    <h1 className="text-2xl font-semibold text-foreground dark:text-white/95">Cricket Panel</h1>
                    <div className="ml-auto flex items-center gap-4">
                        <ModeToggle />
                    </div>
                </header>

                {/* Match Header */}
                <MatchHeader
                    matchTitle={MATCH_DATA.matchTitle}
                    venue={MATCH_DATA.venue}
                    date={MATCH_DATA.date}
                    series={MATCH_DATA.series}
                    tossInfo={MATCH_DATA.tossInfo}
                    result={MATCH_DATA.result}
                />

                {/* Innings Cards */}
                {MATCH_DATA.innings.map((innings, index) => (
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

                {/* Match Information */}
                <MatchInfoSection data={MATCH_DATA} />
            </div>
        </div>
    )
}