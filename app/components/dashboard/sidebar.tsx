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
    <div className="flex flex-col h-full bg-sidebar/95 backdrop-blur-sm text-sidebar-foreground">
      <div className="flex items-center gap-3 p-8 border-b border-sidebar-border/30">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative bg-blue-600 p-2.5 rounded-lg transform transition-transform group-hover:scale-110 active:scale-95 shadow-lg">
            <Trophy className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-black text-2xl tracking-tighter text-white">MATCH</span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-blue-400/80 font-bold -mt-1">Control Center</span>
        </div>
      </div>

      <ScrollArea className="flex-1 px-4 py-8">
        <div className="mb-4 px-2">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-sidebar-foreground/30 mb-4 px-2">Sources</h2>
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
                      ? 'bg-blue-600/10 text-white translate-x-1 shadow-sm'
                      : 'text-sidebar-foreground/60 hover:text-white hover:bg-white/5 hover:translate-x-1'
                    }
                  `}
                >
                  <div className={`
                    p-1.5 rounded-lg transition-all duration-300
                    ${isActive ? 'bg-blue-600 text-white shadow-md' : 'bg-sidebar-accent/50 text-sidebar-foreground/40 group-hover:text-white group-hover:bg-blue-600/50'}
                  `}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="flex-1 text-left">{site}</span>
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </ScrollArea>

      <div className="mt-auto border-t border-sidebar-border/30 p-6 bg-black/10">
        <div className="flex items-center gap-3 mb-4 px-2">
          <div className="relative">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 border-2 border-white/10 flex items-center justify-center text-xs font-bold text-white shadow-xl">
              AD
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-[#1A365D] animate-pulse"></div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-white truncate">Administrator</span>
            <span className="text-[10px] text-green-400 font-medium">Online</span>
          </div>
        </div>
        <div className="flex items-center justify-between px-2 text-[10px] font-bold tracking-widest text-sidebar-foreground/20">
          <span>v1.0.0</span>
          <div className="flex gap-2">
            <div className="h-1 w-1 rounded-full bg-blue-500/50" />
            <div className="h-1 w-1 rounded-full bg-blue-500/50" />
            <div className="h-1 w-1 rounded-full bg-blue-500/50" />
          </div>
        </div>
      </div>
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
      <aside className="hidden md:flex w-72 border-r border-sidebar-border bg-sidebar h-screen sticky top-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.2)]">
        <SidebarContent sites={sites} onSiteClick={scrollToCard} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40 bg-sidebar/80 backdrop-blur-md text-sidebar-foreground shadow-lg border border-sidebar-border/30 rounded-xl hover:bg-sidebar">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 border-r-0 bg-sidebar shadow-2xl">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SidebarContent sites={sites} onSiteClick={scrollToCard} />
        </SheetContent>
      </Sheet>
    </>
  )
}
