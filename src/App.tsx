import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppLayout } from './app/AppLayout'
import { HomePage } from './pages/HomePage'
import { CatalogPage } from './pages/CatalogPage'
import { ProductPage } from './pages/ProductPage'
import { ServicesPage } from './pages/ServicesPage'
import { BlogPage } from './pages/BlogPage'
import { BlogArticlePage } from './pages/BlogArticlePage'
import { CompanyPage } from './pages/CompanyPage'
import { ContactsPage } from './pages/ContactsPage'
import { AccountPage } from './pages/AccountPage'
import { AdminPage } from './pages/AdminPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { FastOrderProvider } from './features/fast-order/FastOrderContext'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <FastOrderProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="catalog/:slug" element={<CatalogPage />} />
              <Route path="product/:slug" element={<ProductPage />} />
              <Route path="services" element={<ServicesPage />} />
              <Route path="blog" element={<BlogPage />} />
              <Route path="blog/:slug" element={<BlogArticlePage />} />
              <Route path="company" element={<CompanyPage />} />
              <Route path="contacts" element={<ContactsPage />} />
              <Route path="account" element={<AccountPage />} />
              <Route path="admin" element={<AdminPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FastOrderProvider>
    </QueryClientProvider>
  )
}

export default App
