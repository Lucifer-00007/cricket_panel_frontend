import { Card, CardContent, CardTitle, ScoreHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { type MatchInfo } from '@/lib/scoreboard-types'

interface MatchInfoSectionProps {
    matchInfo: MatchInfo
}

export function MatchInfoSection({ matchInfo }: MatchInfoSectionProps) {
    return (
        <Card className="border border-border/50 dark:border-border/30 shadow-sm bg-card">
            <ScoreHeader className="px-6 py-4 bg-muted/60 dark:bg-white/[0.08]">
                <CardTitle className="text-lg font-bold text-foreground dark:text-white/95">
                    Match Information
                </CardTitle>
            </ScoreHeader>

            <CardContent className="px-6 space-y-3">
                {/* Match */}
                {matchInfo.umpires && matchInfo.umpires.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Match:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {'RSA vs WI • 1st T20I • West Indies tour of South Africa, 2026'}
                        </span>
                    </div>
                )}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Series */}
                {matchInfo.umpires && matchInfo.umpires.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Series:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {'West Indies tour of South Africa, 2026'}
                        </span>
                    </div>
                )}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Date */}
                {matchInfo.umpires && matchInfo.umpires.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Date:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {'28 January 2026 - 17:30 IST'}
                        </span>
                    </div>
                )}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Time */}
                {matchInfo.umpires && matchInfo.umpires.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Time:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {'6:00 PM LOCAL, 4:00 PM GMT'}
                        </span>
                    </div>
                )}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Toss */}
                {matchInfo.umpires && matchInfo.umpires.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Toss:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {'West Indies won the toss and chose to bat'}
                        </span>
                    </div>
                )}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Venue */}
                {matchInfo.umpires && matchInfo.umpires.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Venue:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {'SuperSport Park, Centurion'}
                        </span>
                    </div>
                )}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Umpires */}
                {matchInfo.umpires && matchInfo.umpires.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Umpires:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {matchInfo.umpires.join(', ')}
                        </span>
                    </div>
                )}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Third Umpire */}
                {matchInfo.thirdUmpire && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Third Umpire:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {matchInfo.thirdUmpire}
                        </span>
                    </div>
                )}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Match Referee */}
                {matchInfo.referee && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Match Referee:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {matchInfo.referee}
                        </span>
                    </div>
                )}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Team 1 Squad */}
                {/* {matchInfo.team1Squad && matchInfo.team1Squad.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Team 1 Squad:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {matchInfo.team1Squad.join(', ')}
                        </span>
                    </div>
                )} */}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

                {/* Team-2 Squad */}
                {/* {matchInfo.team2Squad && matchInfo.team2Squad.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Team-2 Squad:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {matchInfo.team2Squad.join(', ')}
                        </span>
                    </div>
                )} */}

                <Separator className="h-px bg-border/60 dark:bg-border/40" />

            </CardContent>
        </Card>
    )
}
