import { fetchAllMatches } from '@/lib/api'
import { MatchCard } from '@/components/dashboard/match-card'
import { SiteConfigCards } from '@/components/dashboard/site-config-cards'
import { ModeToggle } from '@/components/mode-toggle'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

export const revalidate = 1800 // 30 minutes

export default async function Page() {
  const siteDataList = await fetchAllMatches()
  const successfulSites = siteDataList.filter((site) => site.data && !site.error)
  const sites = ['Crickbuzz', 'Espn', 'NW18', 'Sportskeeda']

  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="flex items-center justify-between pb-6 border-b">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Cricket Panel</h1>
            <p className="text-sm text-muted-foreground">Manage and track live cricket matches</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
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