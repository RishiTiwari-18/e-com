import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Spinner } from '@/components/ui/spinner.jsx'
import { toast } from 'sonner'
import useProduct from '../hooks/useProduct'
import { Button } from '@/components/ui/button'

function formatPrice(price) {
  if (!price) return '—'
  return `${price.currency || 'INR'} ${price.amount}`
}

function ProductRow({ product }) {
  return (
    <div className='grid gap-5 py-6 md:grid-cols-[160px_minmax(0,1fr)_auto] md:items-start'>
      {product.images?.[0] ? (
        <img
          src={product.images[0]}
          alt={product.title}
          className='h-40 w-full object-cover md:h-36'
          loading='lazy'
        />
      ) : (
        <div className='flex h-40 items-center justify-center text-xs uppercase tracking-[0.3em] text-stone-400 md:h-36'>
          No image
        </div>
      )}

      <div className='space-y-3'>
        <div className='space-y-2'>
          <h2 className='text-xl font-semibold tracking-tight text-stone-900'>{product.title}</h2>
          <p className='max-w-3xl text-sm leading-6 text-stone-500'>{product.description}</p>
        </div>
        <p className='text-xs uppercase tracking-[0.25em] text-stone-400'>
          {product.images?.length || 0} images
        </p>
      </div>

      <div className='space-y-2 text-left md:text-right'>
        <p className='text-lg font-semibold text-stone-900'>{formatPrice(product.price)}</p>
        <p className='text-xs uppercase tracking-[0.25em] text-stone-400'>Listed product</p>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const { handleGetProducts } = useProduct()
  const { items, loading } = useSelector((state) => state.products)
  const navigate = useNavigate()

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await handleGetProducts()
      } catch (error) {
        toast.error(error.message || 'Failed to load products')
      }
    }

    loadProducts()
  }, [])

  return (
    <main className='min-h-screen px-6 py-10 text-stone-900'>
      <section className='mx-auto w-full max-w-6xl space-y-10'>
        <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
          <div className='space-y-6'>
            <p className='text-xs font-semibold uppercase tracking-[0.35em] text-stone-500'>Product catalog</p>
            <h1 className='text-4xl font-semibold tracking-tight'>All added products</h1>

          </div>

          <Button variant="link" onClick={() => navigate('/seller/create-product')} className='text-sm font-medium underline underline-offset-4'>
            Add a new product
          </Button>
        </div>

        {loading ? (
          <div className='flex min-h-72 items-center justify-center'>
            <Spinner />
          </div>
        ) : items.length === 0 ? (
          <div className='space-y-4 py-12'>
            <p className='text-lg font-medium text-stone-900'>No products yet.</p>
            <p className='text-sm text-stone-500'>Once you create a product it will show up here.</p>
          </div>
        ) : (
          <div className='space-y-2'>
            {items.map((product) => (
              <ProductRow key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
