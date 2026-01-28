import { Card, CardContent, CardTitle, ScoreHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { type ScoreboardData } from '@/lib/scoreboard-types'

interface MatchInfoSectionProps {
    data: ScoreboardData
}

export function MatchInfoSection({ data }: MatchInfoSectionProps) {
    const { matchInfo } = data

    return (
        <Card className="border border-border/50 dark:border-border/30 shadow-sm bg-card">
            <ScoreHeader className="px-6 py-4 bg-muted/60 dark:bg-white/[0.08]">
                <CardTitle className="text-lg font-bold text-foreground dark:text-white/95">
                    Match Information
                </CardTitle>
            </ScoreHeader>

            <CardContent className="px-6 space-y-3">
                {/* Match */}
                <div className="text-sm">
                    <span className="font-semibold text-foreground dark:text-white/90">Match:</span>{' '}
                    <span className="text-muted-foreground dark:text-white/70">
                        {data.matchTitle}
                        {data.series ? ` • ${data.series}` : ''}
                    </span>
                </div>

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Series */}
                <div className="text-sm">
                    <span className="font-semibold text-foreground dark:text-white/90">Series:</span>{' '}
                    <span className="text-muted-foreground dark:text-white/70">
                        {data.series}
                    </span>
                </div>

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Date */}
                <div className="text-sm">
                    <span className="font-semibold text-foreground dark:text-white/90">Date:</span>{' '}
                    <span className="text-muted-foreground dark:text-white/70">
                        {data.date}
                    </span>
                </div>

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Time */}
                {data.time && (
                    <>
                        <div className="text-sm">
                            <span className="font-semibold text-foreground dark:text-white/90">Time:</span>{' '}
                            <span className="text-muted-foreground dark:text-white/70">
                                {data.time}
                            </span>
                        </div>
                        <Separator className="h-px bg-border/60 dark:bg-border/40" />
                    </>
                )}

                {/* Toss */}
                {data.tossInfo && (
                    <>
                        <div className="text-sm">
                            <span className="font-semibold text-foreground dark:text-white/90">Toss:</span>{' '}
                            <span className="text-muted-foreground dark:text-white/70">
                                {data.tossInfo}
                            </span>
                        </div>
                        <Separator className="h-px bg-border/60 dark:bg-border/40" />
                    </>
                )}

                {/* Venue */}
                <div className="text-sm">
                    <span className="font-semibold text-foreground dark:text-white/90">Venue:</span>{' '}
                    <span className="text-muted-foreground dark:text-white/70">
                        {data.venue}
                    </span>
                </div>

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Umpires */}
                {matchInfo?.umpires && matchInfo.umpires.length > 0 && (
                    <>
                        <div className="text-sm">
                            <span className="font-semibold text-foreground dark:text-white/90">Umpires:</span>{' '}
                            <span className="text-muted-foreground dark:text-white/70">
                                {matchInfo.umpires.join(', ')}
                            </span>
                        </div>
                        <Separator className="h-px bg-border/60 dark:bg-border/40" />
                    </>
                )}

                {/* Third Umpire */}
                {matchInfo?.thirdUmpire && (
                    <>
                        <div className="text-sm">
                            <span className="font-semibold text-foreground dark:text-white/90">Third Umpire:</span>{' '}
                            <span className="text-muted-foreground dark:text-white/70">
                                {matchInfo.thirdUmpire}
                            </span>
                        </div>
                        <Separator className="h-px bg-border/60 dark:bg-border/40" />
                    </>
                )}

                {/* Match Referee */}
                {matchInfo?.referee && (
                    <>
                        <div className="text-sm">
                            <span className="font-semibold text-foreground dark:text-white/90">Match Referee:</span>{' '}
                            <span className="text-muted-foreground dark:text-white/70">
                                {matchInfo.referee}
                            </span>
                        </div>
                        <Separator className="h-px bg-border/60 dark:bg-border/40" />
                    </>
                )}

                {/* Player of the Match */}
                {data.playerOfTheMatch && (
                    <>
                        <div className="text-sm">
                            <span className="font-semibold text-foreground dark:text-white/90">Player of the Match:</span>{' '}
                            <span className="text-muted-foreground dark:text-white/70">
                                {data.playerOfTheMatch}
                            </span>
                        </div>
                        <Separator className="h-px bg-border/60 dark:bg-border/40" />
                    </>
                )}

                {/* Team 1 Squad */}
                {data.team1Squad && data.team1Squad.length > 0 && (
                    <>
                        <div className="text-sm">
                            <span className="font-semibold text-foreground dark:text-white/90">
                                {data.innings[0]?.teamName ? `${data.innings[0].teamName} Squad:` : 'Team 1 Squad:'}
                            </span>{' '}
                            <span className="text-muted-foreground dark:text-white/70">
                                {data.team1Squad.join(', ')}
                            </span>
                        </div>
                        <Separator className="h-px bg-border/60 dark:bg-border/40" />
                    </>
                )}

                {/* Team 2 Squad */}
                {data.team2Squad && data.team2Squad.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">
                            {data.innings[1]?.teamName ? `${data.innings[1].teamName} Squad:` : 'Team 2 Squad:'}
                        </span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {data.team2Squad.join(', ')}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
