import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function InstructionsCard() {
  return (
    <Card className="border border-border/50 dark:border-white/[0.05] bg-card dark:bg-card/40 dark:backdrop-blur-md overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <CardContent className="pt-8 pb-8 relative z-10">
        <div className="text-center space-y-6">
          <div className="space-y-1">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-foreground/80">Legend & Instructions</h3>
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
              Reference guide for match status indicators
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="text-[10px] font-black uppercase tracking-widest py-2 px-6 dark:bg-white/5 dark:text-muted-foreground transition-all hover:scale-105">
              Completed
            </Badge>
            <Badge variant="destructive" className="text-[10px] font-black uppercase tracking-widest py-2 px-6 shadow-lg shadow-destructive/20 transition-all hover:scale-105">
              Live Ongoing
            </Badge>
            <Badge variant="default" className="text-[10px] font-black uppercase tracking-widest py-2 px-6 dark:bg-primary/80 transition-all hover:scale-105 shadow-lg shadow-primary/20">
              Upcoming
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
