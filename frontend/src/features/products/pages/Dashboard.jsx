import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner.jsx'
import { toast } from 'sonner'
import useProduct from '../hooks/useProduct'
import { Button } from '@/components/ui/button'
import Heading from '@/components/heading'
import ProductCard from '../components/ProductCard'


export default function Dashboard() {
  const { handleGetSellerProducts } = useProduct()
  const { sellerProducts, loading } = useSelector((state) => state.products)
  const navigate = useNavigate()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await handleGetSellerProducts()
      } catch (error) {
        toast.error(error.message || 'Failed to load products')
      }
    }

    loadProducts()
  }, [])

  return (
    <main className='min-h-screen px-6 py-10 text-stone-900'>
      <section className='mx-auto w-full max-w-6xl space-y-10'>
        <div className='flex flex-col gap-4 mb-20 md:flex-row md:items-end md:justify-between'>
          <div className='space-y-8'>
            <p className='text-xs font-semibold uppercase tracking-[0.35em] text-stone-500'>Product catalog</p>
            <Heading>All added products</Heading>
          </div>

          <Button variant="link" onClick={() => navigate('/seller/create-product')} className='text-sm font-medium underline underline-offset-4'>
            Add a new product
          </Button>
        </div>

        {loading ? (
          <div className='flex min-h-72 items-center justify-center'>
            <Spinner />
          </div>
        ) : sellerProducts.length === 0 ? (
          <div className='space-y-4 py-12'>
            <p className='text-lg font-medium text-stone-900'>No products yet.</p>
            <p className='text-sm text-stone-500'>Once you create a product it will show up here.</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7'>
            {sellerProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
