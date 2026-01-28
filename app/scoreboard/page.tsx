import { ScoreboardView } from '@/components/scoreboard/scoreboard-view'
import { MATCH_DATA } from '@/constants/match-data'

export default function ScoreboardPage() {
    return <ScoreboardView data={MATCH_DATA} />
}
