import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center space-y-8 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
        <div className="relative bg-card p-8 rounded-full shadow-2xl border border-border/50">
          <FileQuestion className="h-24 w-24 text-primary animate-pulse" />
        </div>
      </div>

      <div className="space-y-4 max-w-md px-4">
        <h1 className="text-4xl font-black tracking-tighter sm:text-6xl bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
          404
        </h1>
        <h2 className="text-xl font-bold tracking-tight uppercase text-foreground/80">
          Page Not Found
        </h2>
        <p className="text-muted-foreground font-medium">
          The match you are looking for has either been completed or does not exist on this pitch.
        </p>
      </div>

      <div className="pt-4">
        <Button asChild size="lg" className="font-bold tracking-wider transition-all">
          <Link href="/">
            RETURN TO PITCH
          </Link>
        </Button>
      </div>
    </div>
  )
}
