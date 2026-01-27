import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { MatchTable } from './match-table'
import { type SiteData } from '@/lib/types'
import { ExternalLink } from 'lucide-react'

interface MatchCardProps {
  siteName: string
  apiUrl: string
  data: SiteData
}

export function MatchCard({ siteName, apiUrl, data }: MatchCardProps) {
  return (
    <Card 
      id={`${siteName}-card`} 
      className="scroll-mt-20 border border-border/50 dark:border-white/[0.08] border-t-4 border-t-primary shadow-lg bg-card dark:bg-card overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-0.5"
    >
      <CardHeader className="border-b border-border/40 dark:border-white/[0.05] bg-muted/20 dark:bg-white/[0.02] pb-3 px-6">
        <CardTitle className="flex items-center gap-2">
          <a
            href={apiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-foreground/90 hover:text-primary transition-all font-black tracking-tight"
          >
            <div className="bg-primary/10 dark:bg-primary/20 p-2 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm group-hover:shadow-primary/40 group-hover:scale-110">
              <span className="text-lg leading-none">{siteName.charAt(0)}</span>
            </div>
            <span className="text-xl">{siteName}</span>
            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0 text-primary" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <MatchTable data={data} />
      </CardContent>
    </Card>
  )
}
