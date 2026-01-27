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
    <Card id={`${siteName}-card`} className="scroll-mt-20 border-t-4 border-t-primary shadow-sm">
      <CardHeader className="border-b pb-3">
        <CardTitle className="flex items-center gap-2">
          <a
            href={apiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex items-center gap-2"
          >
            {siteName}
            <ExternalLink className="h-4 w-4" />
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MatchTable data={data} />
      </CardContent>
    </Card>
  )
}
