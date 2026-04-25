import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner.jsx'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar.jsx'
import { toast } from 'sonner'
import useProduct from '../hooks/useProduct'
import Heading from '@/components/heading'
import ProductCard from '../components/ProductCard'
import Header from '../components/Header'

export default function Home() {
  const { handleGetAllProducts } = useProduct()
  const { products, loading } = useSelector((state) => state.products)

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await handleGetAllProducts()
      } catch (error) {
        toast.error(error.message || 'Failed to load products')
      }
    }

    loadProducts()
  }, [])

  return (
    <main className='min-h-screen bg-background text-stone-900'>
        <Header/>

      <section className='mx-auto w-full max-w-6xl space-y-12 px-6 py-10'>
        <div className='relative overflow-hidden rounded-2xl border border-border/60 bg-linear-to-r from-secondary/25 via-background to-accent/20 p-8 md:p-12'>
          <p className='mb-4 text-xs font-semibold uppercase tracking-[0.35em] text-stone-600'>Shop everything</p>
          <Heading>Explore products picked for you</Heading>
          <p className='mt-4 max-w-2xl text-sm text-stone-600'>
            Discover trending products from sellers across categories. Fresh finds, great prices, and more added daily.
          </p>
        </div>

        {loading ? (
          <div className='flex min-h-72 items-center justify-center'>
            <Spinner />
          </div>
        ) : products.length === 0 ? (
          <div className='space-y-4 py-12'>
            <p className='text-lg font-medium text-stone-900'>No products yet.</p>
            <p className='text-sm text-stone-500'>Once products are added, they will appear here.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
