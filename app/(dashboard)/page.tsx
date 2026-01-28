import { fetchAllMatches } from '@/lib/api'
import { MatchCard } from '@/components/dashboard/match-card'
import { SiteConfigCards } from '@/components/dashboard/site-config-cards'
import { ModeToggle } from '@/components/mode-toggle'

export const revalidate = 60 // Match the API revalidate time

export default async function Page() {
  const siteDataList = await fetchAllMatches()
  const successfulSites = siteDataList.filter((site) => site.data && !site.error)
  const sites = ['Crickbuzz', 'Espn', 'NW18', 'Sportskeeda', 'CricketLineGuru']

  return (
    <div className="space-y-8 pb-20">
      {/* Header */}
      <header className="flex items-center gap-4 pb-4 border-b border-border/40">
        <h1 className="text-2xl font-semibold text-foreground/90">Cricket Panel</h1>
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
        </div>
      </header>

      {/* Configuration Cards */}
      <section>
        <SiteConfigCards sites={sites} />
      </section>

      {/* Main Content Area */}
      <div className="space-y-6">
        {successfulSites.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-lg border border-dashed text-muted-foreground">
            No match data available. Please check your configurations.
          </div>
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
