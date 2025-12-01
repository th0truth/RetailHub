import { createContext, useContext, useState } from 'react'
import type { Product } from '../../data/catalog'

type FastOrderPayload = {
  product: Product
  origin: { type: 'product_page' | 'catalog' | 'homepage'; ref?: string }
}

type FastOrderContextValue = {
  isOpen: boolean
  payload?: FastOrderPayload
  open: (payload: FastOrderPayload) => void
  close: () => void
}

const FastOrderContext = createContext<FastOrderContextValue | undefined>(undefined)

export const FastOrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [payload, setPayload] = useState<FastOrderPayload>()
  const [isOpen, setIsOpen] = useState(false)

  const open = (nextPayload: FastOrderPayload) => {
    setPayload(nextPayload)
    setIsOpen(true)
  }

  const close = () => setIsOpen(false)

  return (
    <FastOrderContext.Provider value={{ isOpen, payload, open, close }}>
      {children}
    </FastOrderContext.Provider>
  )
}

export const useFastOrder = () => {
  const context = useContext(FastOrderContext)
  if (!context) {
    throw new Error('useFastOrder must be used within FastOrderProvider')
  }
  return context
}

