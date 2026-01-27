import { fetchAllMatches } from '@/lib/api'
import { MatchCard } from '@/components/dashboard/match-card'
import { InstructionsCard } from '@/components/dashboard/instructions-card'

export const revalidate = 1800 // 30 minutes

export default async function Page() {
  const siteDataList = await fetchAllMatches()
  const successfulSites = siteDataList.filter((site) => site.data && !site.error)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Cricket Panel</h1>
      </div>

      <InstructionsCard />

      <div className="space-y-6">
        {successfulSites.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No match data available. Please try again later.
          </p>
        ) : (
          successfulSites.map(({ siteName, apiUrl, data }) => (
            <MatchCard
              key={siteName}
              siteName={siteName}
              apiUrl={apiUrl}
              data={data!}
            />
          ))
        )}
      </div>
    </div>
  )
}