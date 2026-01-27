"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Globe } from "lucide-react"

interface SiteConfigCardsProps {
    sites: string[]
}

export function SiteConfigCards({ sites }: SiteConfigCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sites.map((site) => {
                return (
                    <Card key={site} className="relative overflow-hidden shadow-md border-border group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-b from-card to-card/50">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <CardHeader className="pb-3 flex flex-row items-center gap-3 space-y-0 relative z-10">
                            <div className="bg-primary/10 p-2.5 rounded-xl text-primary transform transition-transform group-hover:scale-110 group-hover:rotate-3 shadow-inner">
                                <Globe className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-base font-bold tracking-tight">{site}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 relative z-10">
                            <div className="space-y-2">
                                <Input
                                    id={`${site}-key`}
                                    placeholder="Enter key..."
                                    className="h-10 bg-background/50 border-border/40 focus:ring-primary/30 transition-all"
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                <Button
                                    size="sm"
                                    className="w-full bg-primary text-primary-foreground font-bold tracking-wider shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 transform active:scale-[0.98]"
                                >
                                    SUBMIT
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                )
            })}
        </div>
    )
}
