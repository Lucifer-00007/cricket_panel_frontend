import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function InstructionsCard() {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center space-y-4">
          <h3 className="text-lg font-bold">INSTRUCTIONS</h3>
          <p className="text-sm text-muted-foreground">
            *The following color indicates the match status
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge variant="secondary" className="text-sm py-2 px-4">
              Completed Matches
            </Badge>
            <Badge variant="destructive" className="text-sm py-2 px-4">
              Live Matches Ongoing
            </Badge>
            <Badge variant="default" className="text-sm py-2 px-4">
              Upcoming Matches
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
