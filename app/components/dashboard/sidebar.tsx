'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu, Trophy, Activity, PlayCircle, Globe, Award } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  sites: string[]
}

const siteIcons: Record<string, React.ElementType> = {
  'Crickbuzz': Activity,
  'Espn': PlayCircle,
  'NW18': Globe,
  'Sportskeeda': Award,
}

function SidebarContent({ sites, onSiteClick }: { sites: string[]; onSiteClick: (site: string) => void }) {
  const [activeSite, setActiveSite] = useState<string | null>(null)

  const handleSiteClick = (site: string) => {
    setActiveSite(site)
    onSiteClick(site)
  }

  return (
    <div className="flex flex-col h-full bg-sidebar dark:bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 p-8 border-b border-sidebar-border/50">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-blue-600 p-2.5 rounded-lg transform transition-transform group-hover:scale-110 active:scale-95 shadow-lg shadow-blue-500/20">
            <Trophy className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tighter text-white drop-shadow-sm">MATCH</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold -mt-1 opacity-90">Control Center</span>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-8">
        <div className="mb-4 px-2">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-sidebar-foreground/40 mb-4 px-2">Sources</h2>
          <nav className="space-y-1.5">
            {sites.map((site) => {
              const Icon = siteIcons[site] || Trophy
              const isActive = activeSite === site
              return (
                <button
                  key={site}
                  onClick={() => handleSiteClick(site)}
                  className={`
                    group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300
                    ${isActive
                      ? 'bg-blue-600/15 text-white translate-x-1 shadow-[0_0_20px_rgba(59,130,246,0.1)]'
                      : 'text-sidebar-foreground/60 hover:text-white hover:bg-white/5 dark:hover:bg-white/[0.03] hover:translate-x-1'
                    }
                  `}
                >
                  <div className={`
                    p-1.5 rounded-lg transition-all duration-300
                    ${isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/40'
                      : 'bg-sidebar-accent/50 dark:bg-white/5 text-sidebar-foreground/40 group-hover:text-white group-hover:bg-blue-600/80 group-hover:shadow-md'
                    }
                  `}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-left">{site}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.8)] animate-pulse" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </ScrollArea>
    </div>
  )
}

export function Sidebar({ sites }: SidebarProps) {
  const [open, setOpen] = useState(false)

  const scrollToCard = (siteId: string) => {
    const element = document.getElementById(`${siteId}-card`)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setOpen(false)
    }
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 border-r-2 border-sidebar-border bg-sidebar dark:bg-sidebar h-screen sticky top-0 z-30 shadow-[4px_0_32px_rgba(0,0,0,0.5)] dark:shadow-[4px_0_32px_rgba(59,130,246,0.08)]">
        <SidebarContent sites={sites} onSiteClick={scrollToCard} />
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center px-4 py-3 bg-sidebar/95 dark:bg-sidebar/80 backdrop-blur-md border-b border-sidebar-border/30 dark:border-white/5 text-sidebar-foreground shadow-lg">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-3 hover:bg-white/5 text-sidebar-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-0 bg-sidebar dark:bg-sidebar/90 shadow-2xl">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SidebarContent sites={sites} onSiteClick={scrollToCard} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.3)]" />
          <span className="font-black text-lg tracking-tight text-white">CRICKET PANEL</span>
        </div>
      </div>
    </>
  )
}
