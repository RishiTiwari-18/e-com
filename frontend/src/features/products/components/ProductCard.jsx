import { useNavigate } from "react-router-dom";

function formatPrice(price) {
  if (!price) return "—";
  return `Rs.${price}`;
}

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const handleCardClick = (event) => {
    navigate(`/products/${product._id}`);
  };

  console.log(product)

  return (
    <div
      className=" flex h-full cursor-pointer flex-col overflow-hidden"
      onClick={handleCardClick}

    >
      {/* Image Section */}
                <div className="relative rounded-xl overflow-hidden w-full aspect-4/5">
                  {
                    <div className="absolute">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full hover:opacity-0  duration-500 ease-in-out w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  }
                  {
                    <img
                      src={product.images[1]}
                      alt={product.title}
                      className="h-full  w-full object-cover"
                      loading="lazy"
                    />
                  }
                </div>

      {/* Content Section */}
      <div className="flex flex-col py-4">
        {/* Title */}
        <h3 className="font-roboto-condensed uppercase text-sm font-normal text-foreground overflow-hidden">
          {product.title}
        </h3>


        {/* Price at Bottom */}
        <div className="mt-1">
          <p className="text-md text-primary uppercase font-mono">
            {formatPrice(product.price)}
          </p>
        </div>
      </div>
    </div>
  );
}
