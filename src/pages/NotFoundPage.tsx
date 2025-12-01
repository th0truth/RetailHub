import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export const NotFoundPage = () => (
  <div className="container section-padding text-center space-y-6">
    <p className="eyebrow">404</p>
    <h1 className="text-5xl font-semibold text-white">Page not found</h1>
    <p className="text-white/60">The page you requested is not available. Explore the catalog or go home.</p>
    <div className="flex justify-center gap-4">
      <Button asChild>
        <Link to="/">Back to home</Link>
      </Button>
      <Button asChild variant="secondary">
        <Link to="/catalog/fiscal-printers">Catalog</Link>
      </Button>
    </div>
  </div>
)

