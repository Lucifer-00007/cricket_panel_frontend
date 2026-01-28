import { Card, CardContent, CardTitle, ScoreHeader } from '@/components/ui/card'
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

            <CardContent className="p-6 space-y-3">
                {matchInfo.umpires && matchInfo.umpires.length > 0 && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Umpires:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {matchInfo.umpires.join(', ')}
                        </span>
                    </div>
                )}

                {matchInfo.thirdUmpire && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Third Umpire:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {matchInfo.thirdUmpire}
                        </span>
                    </div>
                )}

                {matchInfo.referee && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Match Referee:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {matchInfo.referee}
                        </span>
                    </div>
                )}

                {matchInfo.reserve && (
                    <div className="text-sm">
                        <span className="font-semibold text-foreground dark:text-white/90">Reserve Umpire:</span>{' '}
                        <span className="text-muted-foreground dark:text-white/70">
                            {matchInfo.reserve}
                        </span>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
