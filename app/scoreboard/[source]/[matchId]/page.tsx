import { fetchMatchDetails } from '@/lib/api'
import { transformScorecardData } from '@/lib/transformers'
import { ScoreboardView } from '@/components/scoreboard/scoreboard-view'
import { notFound } from 'next/navigation'
import { SITE_SOURCE_MAP } from '@/lib/constants'

interface PageProps {
    params: Promise<{
        source: string
        matchId: string
    }>
}

export default async function MatchScoreboardPage({ params }: PageProps) {
    const resolvedParams = await params
    const { source, matchId } = resolvedParams

    // Validate source
    const validSources = Object.values(SITE_SOURCE_MAP)
    if (!validSources.includes(source)) {
        notFound()
    }

    try {
        const rawData = await fetchMatchDetails(source, matchId)
        const scoreboardData = transformScorecardData(rawData)

        return <ScoreboardView data={scoreboardData} />
    } catch (error) {
        throw error
    }
}
