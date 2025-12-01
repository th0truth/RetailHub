import { Star, ShoppingCart, Heart, GitCompareArrows } from 'lucide-react'
import clsx from 'clsx'
import type { Product } from '../../data/catalog'
import { Button } from '../ui/Button'
import { formatCurrency } from '../../lib/format'
import { useFastOrder } from '../../features/fast-order/FastOrderContext'
import { useCommerceStore, isCompared, isFavorited } from '../../store/commerce'

type ProductCardProps = {
  product: Product
  origin: 'homepage' | 'catalog'
}

const badgeTone: Record<Product['stockStatus'], string> = {
  in_stock: 'text-success',
  low_stock: 'text-warning',
  preorder: 'text-white/60',
}

export const ProductCard = ({ product, origin }: ProductCardProps) => {
  const openFastOrder = useFastOrder().open
  const toggleFavorite = useCommerceStore((state) => state.toggleFavorite)
  const toggleCompare = useCommerceStore((state) => state.toggleCompare)
  const addToCart = useCommerceStore((state) => state.addToCart)
  const favorites = useCommerceStore((state) => state.favorites)
  const comparisons = useCommerceStore((state) => state.compare)

  return (
    <article className="flex flex-col rounded-3xl border border-white/5 bg-base-800/70 p-4 shadow-soft">
      <div className="relative">
        <img
          src={product.images[0]?.url}
          alt={product.images[0]?.alt}
          className="h-56 w-full rounded-2xl object-cover"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {product.badges.map((badge) => (
            <span key={badge} className="rounded-full bg-base-900/70 px-3 py-1 text-xs uppercase">
              {badge}
            </span>
          ))}
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            className={clsx(
              'rounded-full border border-white/10 bg-base-900/80 p-2 text-white',
              isFavorited(product.id, favorites) && 'border-accent text-accent'
            )}
            aria-label="Add to favorites"
            onClick={() => toggleFavorite(product.id)}
          >
            <Heart className="h-4 w-4" />
          </button>
          <button
            className={clsx(
              'rounded-full border border-white/10 bg-base-900/80 p-2 text-white',
              isCompared(product.id, comparisons) && 'border-accent text-accent'
            )}
            aria-label="Add to compare"
            onClick={() => toggleCompare(product.id)}
          >
            <GitCompareArrows className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 pt-4">
        <div>
          <p className="text-xs uppercase text-white/50">{product.brand}</p>
          <h3 className="text-lg font-semibold text-white">{product.title}</h3>
          <p className="text-sm text-white/60">{product.shortDescription}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Star className="h-4 w-4 text-warning" />
          {product.rating} ({product.reviews} reviews)
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/50">Price</p>
            <p className="text-2xl font-semibold text-white">
              {product.price ? formatCurrency(product.price, product.currency) : 'Request price'}
            </p>
          </div>
          <span className={clsx('text-sm font-semibold', badgeTone[product.stockStatus])}>
            {product.stockStatus.replace('_', ' ')}
          </span>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            className="flex-1"
            onClick={() =>
              openFastOrder({
                product,
                origin: { type: origin, ref: product.id },
              })
            }
          >
            Order
          </Button>
          <Button
            variant="secondary"
            size="md"
            className="flex-1"
            onClick={() => addToCart(product.id)}
            icon={<ShoppingCart className="h-4 w-4" />}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  )
}

