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
    <div id={`${siteName}-card`} className="space-y-4 scroll-mt-20">
      <div className="px-6">
        <a
          href={apiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold text-blue-600 hover:underline transition-all"
        >
          {siteName}
        </a>
      </div>
      <Card className="border border-border/50 shadow-sm overflow-hidden bg-card">
        <CardContent className="p-0">
          <MatchTable data={data} />
        </CardContent>
      </Card>
    </div>
  )
}
