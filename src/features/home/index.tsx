import { Link } from 'react-router-dom'
import { BrandHero } from '@/components/brand-lockup'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function HomePage() {
  return (
    <div className="mx-auto max-w-lg px-4 py-10 text-left md:py-14">
      <BrandHero />

      <p className="mt-8 text-muted-foreground leading-relaxed">
        Look up words in the dictionary or study kanji. Choose a section below to get
        started.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          to="/dictionary"
          className={cn(buttonVariants({ size: 'lg' }), 'min-w-[10rem] justify-center')}
        >
          Open dictionary
        </Link>
        <Link
          to="/kanji"
          className={cn(
            buttonVariants({ variant: 'outline', size: 'lg' }),
            'min-w-[10rem] justify-center'
          )}
        >
          Browse kanji
        </Link>
      </div>
    </div>
  )
}
