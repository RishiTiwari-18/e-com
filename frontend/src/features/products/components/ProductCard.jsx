import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { useNavigate } from 'react-router-dom'

function formatPrice(price) {
  if (!price) return '—'
  return `${price.currency || 'INR'} ${price.amount}`
}

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const images = product.images?.length ? product.images : []

  const handleCardClick = (event) => {
    const clickedCarouselControl = event.target.closest(
      '[data-slot="carousel-previous"], [data-slot="carousel-next"]'
    )

    if (clickedCarouselControl) return

    navigate(`/products/${product._id}`)
  }

  return (
    <div
      className='group flex h-full cursor-pointer flex-col overflow-hidden rounded-md'
      onClick={handleCardClick}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          handleCardClick(event)
        }
      }}
      role='link'
      tabIndex={0}
    >
      {/* Image Section */}
      <div className='relative w-full h-120 sm:h-100 lg:h-80 bg-muted overflow-hidden'>
        {images.length > 0 ? (
          <>
            <Carousel opts={{ loop: true }} className='h-full w-full'>
              <CarouselContent className='ml-0 h-full'>
                {images.map((image, index) => (
                  <CarouselItem key={`${product._id}-${index}`} className='pl-0 h-full'>
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className='h-full w-full object-cover'
                      loading='lazy'
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className='left-3 h-8 w-8 border-0 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100 top-1/2 -translate-y-1/2! transform-none! active:transform-none! focus:transform-none!' />
              <CarouselNext className='right-3 h-8 w-8 border-0 bg-background/80 opacity-0 transition-opacity group-hover:opacity-100 top-1/2 -translate-y-1/2! transform-none! active:transform-none! focus:transform-none!' />
            </Carousel>
          </>
        ) : (
          <div className='flex h-full w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-muted-foreground'>
            No image
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className='flex flex-col py-4 gap-2'>
        {/* Title */}
        <h3 className='font-newsreader capitalize text-md text-foreground overflow-hidden text-ellipsis whitespace-nowrap'>
          {product.title}
        </h3>

        {/* Description */}
        <p className='text-xs text-muted-foreground overflow-hidden text-ellipsis [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical]'>
          {product.description}
        </p>

        {/* Price at Bottom */}
        <div className='mt-auto'>
          <p className='text-sm uppercase tracking-[0.15em] text-stone-600'>
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </div>
  )
}
