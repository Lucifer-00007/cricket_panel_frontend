"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Activity, PlayCircle, Globe, Award, Settings, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { useRef } from "react"

interface SiteConfigCardsProps {
    sites: string[]
}

const siteIcons: Record<string, { icon: any, color: string, gradientFrom: string, gradientTo: string }> = {
    'Crickbuzz': {
        icon: Activity,
        color: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
        gradientFrom: 'from-blue-500/10',
        gradientTo: 'to-blue-500/5'
    },
    'Espn': {
        icon: PlayCircle,
        color: 'bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
        gradientFrom: 'from-orange-500/10',
        gradientTo: 'to-orange-500/5'
    },
    'NW18': {
        icon: Globe,
        color: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
        gradientFrom: 'from-red-500/10',
        gradientTo: 'to-red-500/5'
    },
    'Sportskeeda': {
        icon: Award,
        color: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
        gradientFrom: 'from-green-500/10',
        gradientTo: 'to-green-500/5'
    },
    'CricketLineGuru': {
        icon: Settings,
        color: 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
        gradientFrom: 'from-purple-500/10',
        gradientTo: 'to-purple-500/5'
    },
}

export function SiteConfigCards({ sites }: SiteConfigCardsProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scroll = (direction: 'left' | 'right') => {
        if (!scrollContainerRef.current) return
        const scrollAmount = scrollContainerRef.current.offsetWidth * 0.8
        const scrollTo = direction === 'left'
            ? scrollContainerRef.current.scrollLeft - scrollAmount
            : scrollContainerRef.current.scrollLeft + scrollAmount

        scrollContainerRef.current.scrollTo({
            left: scrollTo,
            behavior: 'smooth'
        })
    }

    return (
        <div className="relative group/carousel">
            {/* Navigation Buttons */}
            <button
                onClick={() => scroll('left')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-background/95 dark:bg-background/90 backdrop-blur-md border border-border/50 dark:border-white/10 rounded-full p-2.5 shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110"
                aria-label="Scroll left"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>

            <button
                onClick={() => scroll('right')}
                className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-background/95 dark:bg-background/90 backdrop-blur-md border border-border/50 dark:border-white/10 rounded-full p-2.5 shadow-xl opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110"
                aria-label="Scroll right"
            >
                <ChevronRight className="h-5 w-5" />
            </button>

            {/* Scrollable Cards */}
            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth px-1 pb-3 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'hsl(var(--primary) / 0.2) transparent',
                }}
            >
                {sites.map((site) => {
                    const { icon: Icon, color, gradientFrom, gradientTo } = siteIcons[site] || {
                        icon: Globe,
                        color: 'bg-gray-100 text-gray-600 dark:bg-gray-500/20 dark:text-gray-400',
                        gradientFrom: 'from-gray-500/10',
                        gradientTo: 'to-gray-500/5'
                    }
                    return (
                        <Card
                            key={site}
                            className="relative overflow-hidden shadow-md hover:shadow-xl border border-border/50 dark:border-white/[0.08] bg-card transition-all duration-300 hover:-translate-y-1 flex-shrink-0 snap-start w-full md:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(25%-12px)] group/card"
                        >
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${gradientFrom} ${gradientTo} opacity-50 group-hover/card:opacity-100 transition-opacity duration-300`} />

                            <CardContent className="relative p-5 space-y-4">
                                {/* Header with Icon and Title */}
                                <div className="flex items-center gap-3">
                                    <div className={`p-3 rounded-xl ${color} shadow-sm transition-transform group-hover/card:scale-110 group-hover/card:rotate-3 duration-300`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground/90 tracking-tight">{site}</p>
                                        <p className="text-xs text-muted-foreground">Enter match key</p>
                                    </div>
                                </div>

                                {/* Input and Button Container */}
                                <div className="flex gap-2">
                                    <Input
                                        id={`${site}-key`}
                                        placeholder="Match key..."
                                        className="h-9 text-sm border-border/60 bg-background/50 dark:bg-white/[0.03] focus:bg-background dark:focus:bg-white/[0.06] transition-colors"
                                    />
                                    <Button
                                        size="sm"
                                        className="h-9 px-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md"
                                    >
                                        <Search className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
