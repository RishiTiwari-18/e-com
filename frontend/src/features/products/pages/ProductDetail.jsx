import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner.jsx'
import { toast } from 'sonner'
import useProduct from '../hooks/useProduct'
import Header from '../components/Header'

function formatPrice(price) {
  if (!price) return '—'

  const currency = (price.currency || 'INR').toUpperCase()
  const amount = Number(price.amount ?? 0)

  if (currency === 'INR') return `₹${amount}`
  if (currency === 'USD') return `$${amount}`

  return `${currency} ${amount}`
}

export default function ProductDetail() {
  const { id } = useParams()
  const { handleGetProductById } = useProduct()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true)
        const data = await handleGetProductById(id)
        setProduct(data)
        setActiveImage(0)
      } catch (error) {
        toast.error(error.message || 'Failed to load product details')
      } finally {
        setIsLoading(false)
      }
    }

    if (id) loadProduct()
  }, [id])

  if (isLoading) {
    return (
      <main className='flex min-h-screen items-center justify-center bg-background'>
        <Spinner />
      </main>
    )
  }

  if (!product) {
    return (
      <main className='min-h-screen bg-background px-6 py-12 text-foreground'>
        <section className='mx-auto w-full max-w-6xl space-y-4'>
          <p className='text-sm uppercase tracking-[0.25em] text-muted-foreground'>Product</p>
          <h1 className='font-newsreader text-4xl text-foreground'>Product not found</h1>
          <Button asChild variant='outline' className='rounded-full'>
            <Link to='/'>Back to home</Link>
          </Button>
        </section>
      </main>
    )
  }

  const images = product.images?.length ? product.images : []
  const currentImage = images[activeImage] || ''
  const createdDate = product?.createdAt
    ? new Date(product.createdAt).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    : 'Recently listed'
  const category = product?.category || 'General'

  return (
    <main className='min-h-screen bg-background text-foreground'>
        <Header/>
      <section className='mx-auto  grid w-full max-w-6xl px-6 gap-6  py-8 lg:grid-cols-2'>
        <div className='flex items-start gap-4 lg:sticky lg:top-24 lg:self-start'>
          {images.length > 1 ? (
            <div className='grid w-16 shrink-0 gap-2 sm:w-18'>
              {images.map((image, index) => (
                <button
                  key={`${product._id}-thumb-${index}`}
                  type='button'
                  onClick={() => setActiveImage(index)}
                  className={`h-16 w-16 overflow-hidden border transition sm:h-20 sm:w-18 ${
                    index === activeImage
                      ? 'border-secondary ring-2 ring-secondary/30'
                      : 'border-border/70 hover:border-secondary/70'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className='h-full w-full object-cover'
                    loading='lazy'
                  />
                </button>
              ))}
            </div>
          ) : null}

          <div className='w-full min-w-0 overflow-hidden bg-muted/30'>
            {currentImage ? (
              <img
                src={currentImage}
                alt={`${product.title} preview ${activeImage + 1}`}
                className='h-130 w-full object-cover sm:h-155'
                loading='lazy'
              />
            ) : (
              <div className='flex h-85 w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-muted-foreground sm:h-115'>
                No image
              </div>
            )}
          </div>
        </div>

        <aside className='grid gap-6 p-5 sm:p-6 lg:grid-rows-[auto_auto_1fr]'>
          <div>
            <h1 className='mt-2 font-newsreader text-3xl font-light leading-tight text-foreground sm:text-[2.25rem]'>
              {product.title}
            </h1>

            <div >
                <p className='mt-2 text-2xl font-semibold font-newsreader text-foreground'>{formatPrice(product.price)}</p>
            </div>

            <div >
              <p className='mt-2 text-sm leading-7 text-muted-foreground'>{product.description}</p>
            </div>
          </div>
          <div className="flex flex-col items-stretch gap-3">
            <Button variant='secondary'>
                Add to cart
            </Button>
            <Button>
                Buy now
            </Button>
          </div>
        </aside>
      </section>
    </main>
  )
}
