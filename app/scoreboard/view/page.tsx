'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { fetchMatchDetails } from '@/lib/api'
import { transformScorecardData } from '@/lib/transformers'
import { ScoreboardView } from '@/components/scoreboard/scoreboard-view'
import { type ScoreboardData } from '@/lib/scoreboard-types'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardFooter, ScoreHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'
import Link from 'next/link'

function ScoreboardContent() {
  const searchParams = useSearchParams()

  const source = searchParams.get('source')
  const matchId = searchParams.get('matchId')

  const [data, setData] = useState<ScoreboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!source || !matchId) {
      setLoading(false)
      return
    }

    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)
        const rawData = await fetchMatchDetails(source, matchId)
        const transformed = transformScorecardData(rawData)
        setData(transformed)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : 'Failed to load match data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [source, matchId])

  if (!source || !matchId) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-border/50">
          <CardHeader>
            <CardTitle className="text-center">Invalid Match Details</CardTitle>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground">
            Missing source or match ID parameters.
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-destructive/50 bg-destructive/5">
          <CardHeader>
            <div className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-6 w-6" />
              <CardTitle>Something went wrong!</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {error}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
            <Button onClick={() => window.location.reload()} variant="default">Try again</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  if (loading || !data) {
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

  return <ScoreboardView data={data} />
}

export default function ScoreboardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScoreboardContent />
    </Suspense>
  )
}
