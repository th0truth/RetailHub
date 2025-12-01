import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { FastOrderModal } from '../features/fast-order/FastOrderModal'

export const AppLayout = () => (
  <div className="min-h-screen bg-base-900 text-white">
    <a href="#main" className="sr-only focus:not-sr-only bg-base-700 px-4 py-2 text-white">
      Skip to content
    </a>
    <Header />
    <main id="main" className="space-y-16 md:space-y-24 pb-16">
      <Outlet />
    </main>
    <Footer />
    <FastOrderModal />
    <ScrollRestoration />
  </div>
)

