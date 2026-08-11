import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import useProduct from "../hooks/useProduct";
import { ArrowUpRight, MoveLeft } from "lucide-react";
import { CounterButton } from "@/components/counter-button";
import Footer from "../components/Footer";
import SizeSelector from "../components/SizeSelector";
import useCart from "@/features/cart/hooks/useCart";
import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";

export default function ProductDetail() {
  const { id } = useParams();
  const { handleGetProductById } = useProduct();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddCartItems } = useCart();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      product: id,
      quantity: 1,
      size: "M",
    },
  });

  const onSubmit = async (data) => {
    try {
      await handleAddCartItems(data);
      toast.success("Added to bag");
    } catch (err) {
      toast.error(err.message || "Failed to add to bag");
      console.log(err);
    }
  };

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const data = await handleGetProductById(id);
        setProduct(data);
      } catch (error) {
        toast.error(error.message || "Failed to load product details");
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background ">
        <section className="grid h-full w-full px-4 md:px-8 gap-6  py-12 lg:grid-cols-2">
          <div>
            <div className="w-full h-120 lg:h-full max-lg:flex max-lg:gap-4 no-scrollbar max-lg:overflow-x-auto min-w-0 space-y-5 overflow-hidden">
              <Skeleton className="h-full w-full rounded-none" />
            </div>
          </div>

          <aside className=" top-28 sticky h-fit ">
            <Link
              to="/collections"
              className="flex w-fit cursor-pointer items-center text-primary gap-2 text-lg font-medium"
            >
              <MoveLeft />
              Return to Shop
            </Link>
            <div className="flex flex-col mt-5 gap-6 items-start">
              <Skeleton className="h-16 w-3/5" />
              <Skeleton className="h-15 w-1/3" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
            </div>
          </aside>
        </section>
        <Footer />
      </main>
    );
  }

  if (!product) {
    return (
      <main className="min-h-screen bg-background px-6 py-12 text-foreground">
        <section className="mx-auto w-full max-w-6xl space-y-4">
          <p className="text-sm uppercase tracking-[0.25em] text-muted-foreground">
            Product
          </p>
          <h1 className="font-newsreader text-4xl text-foreground">
            Product not found
          </h1>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/">Back to home</Link>
          </Button>
        </section>
      </main>
    );
  }

  const images = product.images?.length ? product.images : [];

  return (
    <main className="min-h-screen bg-background ">
      <section className="grid w-full px-4 md:px-8 gap-6  py-12 lg:grid-cols-2">
        <div>
          <div className="w-full max-lg:flex max-lg:gap-4 no-scrollbar max-lg:overflow-x-auto min-w-0 space-y-5 overflow-hidden ">
            {images.length > 0 ? (
              images.map((image, index) => (
                <img
                  src={image}
                  alt={`${product.title} preview ${index + 1}`}
                  className=" w-full object-cover"
                  loading="lazy"
                />
              ))
            ) : (
              <div className="flex h-85 w-full items-center justify-center text-xs uppercase tracking-[0.3em] text-muted-foreground sm:h-115">
                No image
              </div>
            )}
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" top-28 sticky h-fit "
        >
          <Link
            to="/collections"
            className="flex w-fit cursor-pointer items-center text-primary gap-2 text-lg font-medium"
          >
            <MoveLeft />
            Return to Shop
          </Link>
          <div className="flex flex-col mt-5 items-start">
            <div className="flex flex-col gap-6">
              <h1 className=" font-normal text-6xl">{product.title}</h1>

              <div>
                <p className=" text-5xl font-semibold font-mono text-primary ">{`Rs.${product.price}`}</p>
              </div>

              <div>
                <p className=" text-xl">{product.description}</p>
              </div>
            </div>

            {product.hasSizes === true && (
              <div className="py-8 w-full border-b-2 border-primary">
                <Controller
                  control={control}
                  name="size"
                  render={({ field }) => (
                    <SizeSelector
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            )}

            <div className="border-b-2 py-7 flex items-center border-primary w-full">
              <Controller
                control={control}
                name="quantity"
                render={({ field }) => (
                  <CounterButton
                    max={product.units}
                    initialCount={field.value}
                    onChange={(val) => field.onChange(val)}
                  />
                )}
              />
            </div>

            {user ? (
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex items-center cursor-pointer pt-8 gap-2 text-primary w-full text-4xl"
              >
                Add to Bag <ArrowUpRight size={36} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() =>
                  navigate("/login", {
                    state: {
                      from: location.pathname,
                    },
                  })
                }
                className="flex items-center cursor-pointer pt-8 gap-2 text-primary w-full text-4xl"
              >
                Add to Bag <ArrowUpRight size={36} />
              </button>
            )}
          </div>
          <div className="flex flex-col items-stretch gap-3"></div>
        </form>
      </section>
    </main>
  );
}
