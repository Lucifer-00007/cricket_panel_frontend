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
    <Card id={`${siteName}-card`} className="scroll-mt-20 border-t-4 border-t-primary shadow-lg bg-card/40 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl">
      <CardHeader className="border-b border-border/40 bg-muted/20 pb-3 px-6">
        <CardTitle className="flex items-center gap-2">
          <a
            href={apiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-foreground/90 hover:text-primary transition-colors font-bold"
          >
            <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
              {siteName.charAt(0)}
            </div>
            {siteName}
            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <MatchTable data={data} />
      </CardContent>
    </Card>
  )
}
