import {
  Card,
  CardContent,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MatchTable } from './match-table'
import { type SiteData } from '@/lib/types'

interface MatchCardProps {
  siteName: string
  apiUrl: string
  data: SiteData
}

export function MatchCard({ siteName, apiUrl, data }: MatchCardProps) {
  return (
    <div id={`${siteName}-card`} className="space-y-4 scroll-mt-20">

      <Card className="border border-border/50 shadow-sm overflow-hidden bg-card">
        <div className="px-6 text-center">
          <a
            href={apiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xl font-bold text-blue-600 hover:underline transition-all"
          >
            {siteName}
          </a>
        </div>
        <Separator className="h-px bg-border/50" />
        <CardContent className="p-0">
          <MatchTable data={data} siteName={siteName} />
        </CardContent>
      </Card>
    </div>
  )
}
