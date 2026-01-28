import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardTitle, ScoreHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-6 pb-20">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between pb-4">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>

        {/* Match Header Skeleton */}
        <Card className="w-full overflow-hidden border-border/50 bg-card">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Innings Skeleton */}
        <Card className="border border-border/50 shadow-lg bg-card">
          <ScoreHeader className="px-6 py-4 bg-muted/60">
            <div className="flex items-center justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </ScoreHeader>
          <Separator className="h-px bg-border/60" />
          <CardContent className="p-0">
             <div className="px-6 py-4 space-y-3">
                 <Skeleton className="h-8 w-full" />
                 <Skeleton className="h-8 w-full" />
                 <Skeleton className="h-8 w-full" />
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
