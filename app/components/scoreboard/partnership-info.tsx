import { type Partnership } from '@/lib/scoreboard-types'

interface PartnershipInfoProps {
    partnership: Partnership
}

export function PartnershipInfo({ partnership }: PartnershipInfoProps) {
    return (
        <div className="text-sm text-muted-foreground my-2.5">
            <span className="font-semibold text-foreground">Current Partnership:</span>{' '}
            <span className="font-mono tabular-nums">
                {partnership.runs} ({partnership.balls} balls) between {partnership.batsman1} and {partnership.batsman2}
            </span>
        </div>
    )
}
