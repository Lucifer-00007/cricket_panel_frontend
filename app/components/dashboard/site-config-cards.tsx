"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity, PlayCircle, Globe, Award, Trophy } from "lucide-react"

const siteIcons: Record<string, React.ElementType> = {
    'Crickbuzz': Activity,
    'Espn': PlayCircle,
    'NW18': Globe,
    'Sportskeeda': Award,
}

interface SiteConfigCardsProps {
    sites: string[]
}

export function SiteConfigCards({ sites }: SiteConfigCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sites.map((site) => {
                const Icon = siteIcons[site] || Trophy
                return (
                    <Card key={site} className="shadow-sm border-border/60">
                        <CardHeader className="pb-3 flex flex-row items-center gap-2 space-y-0">
                            <div className="bg-primary/10 p-2 rounded-full text-primary">
                                <Icon className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-base font-semibold">{site}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor={`${site}-key`} className="text-muted-foreground text-xs uppercase tracking-wider font-bold">Key</Label>
                                <Input id={`${site}-key`} placeholder="Enter key..." className="h-9" />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button variant="destructive" size="sm" className="w-full">CANCEL</Button>
                                <Button size="sm" className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900">SUBMIT</Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
