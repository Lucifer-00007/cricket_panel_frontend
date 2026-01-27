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
    <div className="space-y-10 pb-20">
      {/* Header */}
      <header className="flex items-center justify-between pb-8 border-b border-border/40 dark:border-white/[0.05]">
        <div className="flex items-center gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tighter hidden md:block uppercase bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">Cricket Panel</h1>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60">Control & Monitoring Dashboard</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
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