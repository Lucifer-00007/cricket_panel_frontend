'use client'

import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Trophy } from 'lucide-react'
import { useState } from 'react'

interface SidebarProps {
  sites: string[]
}

function SidebarContent({ sites, onSiteClick }: { sites: string[]; onSiteClick: (site: string) => void }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 p-6 border-b">
        <Trophy className="h-6 w-6" />
        <span className="font-bold text-xl">MATCH</span>
      </div>
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {sites.map((site) => (
            <Button
              key={site}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => onSiteClick(site)}
            >
              {site}
            </Button>
          ))}
        </nav>
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
      <aside className="hidden md:flex w-60 border-r bg-card h-screen sticky top-0">
        <SidebarContent sites={sites} onSiteClick={scrollToCard} />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="md:hidden">
          <Button variant="ghost" size="icon" className="fixed top-4 left-4 z-40">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-60">
          <SidebarContent sites={sites} onSiteClick={scrollToCard} />
        </SheetContent>
      </Sheet>
    </>
  )
}
