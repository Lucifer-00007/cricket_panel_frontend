"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Activity, PlayCircle, Globe, Award, Settings } from "lucide-react"

interface SiteConfigCardsProps {
    sites: string[]
}

const siteIcons: Record<string, { icon: any, color: string }> = {
    'Crickbuzz': { icon: Activity, color: 'bg-blue-100 text-blue-500' },
    'Espn': { icon: PlayCircle, color: 'bg-orange-100 text-orange-500' },
    'NW18': { icon: Globe, color: 'bg-red-100 text-red-500' },
    'Sportskeeda': { icon: Award, color: 'bg-green-100 text-green-500' },
    'CricketLineGuru': { icon: Settings, color: 'bg-purple-100 text-purple-500' },
}

export function SiteConfigCards({ sites }: SiteConfigCardsProps) {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {sites.map((site) => {
                    const { icon: Icon, color } = siteIcons[site] || { icon: Globe, color: 'bg-gray-100 text-gray-500' }
                    return (
                        <Card key={site} className="shadow-sm border border-border/40 bg-white dark:bg-card">
                            <CardContent className="p-4 flex items-center gap-4">
                                <div className={`p-3 rounded-xl ${color}`}>
                                    <Icon className="h-6 w-6" />
                                </div>
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-bold text-foreground/80">{site}</p>
                                    <Input
                                        id={`${site}-key`}
                                        placeholder="Key"
                                        className="h-8 text-xs border-border/60 bg-transparent"
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
            <div className="flex justify-between items-center px-2">
                <Button variant="destructive" className="bg-[#E74C3C] hover:bg-[#C0392B] px-8 py-6 text-lg font-medium rounded-md">
                    CANCEL
                </Button>
                <Button className="bg-[#2C3E50] hover:bg-[#1A252F] px-8 py-6 text-lg font-medium rounded-md">
                    SUBMIT
                </Button>
            </div>
        </div>
    )
}
