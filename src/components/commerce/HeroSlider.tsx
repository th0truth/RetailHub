import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Pause, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { heroSlides } from '../../data/catalog'
import { Button } from '../ui/Button'

export const HeroSlider = () => {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion)')
    setPrefersReducedMotion(query.matches)
    const handleChange = (event: MediaQueryListEvent) => setPrefersReducedMotion(event.matches)
    if (query.addEventListener) {
      query.addEventListener('change', handleChange)
      return () => query.removeEventListener('change', handleChange)
    }
    query.addListener(handleChange)
    return () => query.removeListener(handleChange)
  }, [])

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return
    const id = setInterval(() => {
      setIndex((current) => (current + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(id)
  }, [isPaused, prefersReducedMotion])

  const goTo = (next: number) => setIndex((next + heroSlides.length) % heroSlides.length)

  const activeSlide = heroSlides[index]

  return (
    <section className="container pt-10">
      <div className="relative overflow-hidden rounded-[32px] border border-white/5 bg-base-800 shadow-soft">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide.id}
            className="grid gap-12 p-10 md:grid-cols-2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <span className="eyebrow">{activeSlide.accentLabel}</span>
              <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight">
                {activeSlide.headline}
              </h1>
              <p className="text-lg text-white/70">{activeSlide.subline}</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" asChild>
                  <Link to={activeSlide.href} className="inline-flex items-center gap-2">
                    {activeSlide.cta}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <button
                  className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:border-accent/40"
                  onClick={() => setIsPaused((prev) => !prev)}
                >
                  {isPaused || prefersReducedMotion ? (
                    <>
                      <Play className="h-4 w-4" /> Resume
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4" /> Pause
                    </>
                  )}
                </button>
              </div>
              <div className="text-sm text-white/60">
                Autoplay with keyboard focus support. Press space to pause/resume.
              </div>
            </div>
            <div className="relative">
              <img
                src={activeSlide.image}
                alt={activeSlide.headline}
                className="h-full w-full rounded-3xl object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-base-900/30 to-transparent" />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
          {heroSlides.map((slide, idx) => (
            <button
              key={slide.id}
              className={`h-2 rounded-full transition-all ${idx === index ? 'w-10 bg-accent' : 'w-3 bg-white/30'}`}
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

