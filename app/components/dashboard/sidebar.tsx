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
  return (
    <div className="flex flex-col h-full bg-sidebar text-sidebar-foreground">
      <div className="flex items-center gap-3 p-6 border-b border-sidebar-border">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Trophy className="h-6 w-6 text-white" />
        </div>
        <span className="font-extrabold text-2xl tracking-tight">MATCH</span>
      </div>
      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          {sites.map((site) => {
            const Icon = siteIcons[site] || Trophy
            return (
              <Button
                key={site}
                variant="ghost"
                className="w-full justify-start text-lg font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground py-6"
                onClick={() => onSiteClick(site)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {site}
              </Button>
            )
          })}
        </nav>
      </ScrollArea>
      <div className="p-6 text-xs text-sidebar-foreground/50 text-center">
        v1.0.0
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
      <aside className="hidden md:flex w-72 border-r border-sidebar-border bg-sidebar h-screen sticky top-0 shadow-xl z-30">
        <SidebarContent sites={sites} onSiteClick={scrollToCard} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40 bg-sidebar text-sidebar-foreground custom-shadow">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 border-r-0 bg-sidebar">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <SidebarContent sites={sites} onSiteClick={scrollToCard} />
        </SheetContent>
      </Sheet>
    </>
  )
}
