'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Menu, LayoutGrid, List, Settings } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  sites: string[]
}

function SidebarContent({ sites, onSiteClick }: { sites: string[]; onSiteClick: (site: string | null) => void }) {
  const [activeSite, setActiveSite] = useState<string | null>(null)

  const handleSiteClick = (site: string | null) => {
    setActiveSite(site)
    onSiteClick(site)
  }

  return (
    <div className="flex flex-col h-full bg-[#0B2447] text-white">
      <div className="flex items-center gap-3 p-6 border-b border-white/10">
        <div className="bg-white p-1 rounded">
          <Settings className="h-6 w-6 text-[#0B2447]" />
        </div>
        <span className="font-bold text-xl tracking-tight">MATCH</span>
      </div>

      <ScrollArea className="flex-1 px-4 py-6">
        <nav className="space-y-2">
          <button
            onClick={() => handleSiteClick(null)}
            className={`
              w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all
              ${activeSite === null ? 'bg-white/10' : 'hover:bg-white/5'}
            `}
          >
            <LayoutGrid className="h-5 w-5" />
            <span>Dashboard</span>
          </button>

          {sites.map((site) => {
            const isActive = activeSite === site
            return (
              <button
                key={site}
                onClick={() => handleSiteClick(site)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-all
                  ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}
                `}
              >
                <List className="h-5 w-5" />
                <span>{site}</span>
              </button>
            )
          })}
        </nav>
      </ScrollArea>
    </div>
  )
}

export function Sidebar({ sites }: SidebarProps) {
  const [open, setOpen] = useState(false)

  const scrollToCard = (siteId: string | null) => {
    if (siteId === null) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      const element = document.getElementById(`${siteId}-card`)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    setOpen(false)
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-72 border-r-2 border-white/10 bg-[#0B2447] h-screen sticky top-0 z-30">
        <SidebarContent sites={sites} onSiteClick={scrollToCard} />
      </aside>

      {/* Mobile Header & Sidebar */}
      <div className="md:hidden sticky top-0 z-40 flex items-center px-4 py-3 bg-[#0B2447] text-white shadow-lg">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="mr-3 hover:bg-white/5 text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-72 border-r-0 bg-[#0B2447] shadow-2xl">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <SidebarContent sites={sites} onSiteClick={scrollToCard} />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <div className="bg-white p-0.5 rounded">
            <Settings className="h-5 w-5 text-[#0B2447]" />
          </div>
          <span className="font-black text-lg tracking-tight text-white">CRICKET PANEL</span>
        </div>
      </div>
    </>
  )
}