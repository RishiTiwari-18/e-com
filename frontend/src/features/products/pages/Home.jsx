import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useProduct from "../hooks/useProduct";
import Header from "../components/Header";
import Logo from "@/features/system/components/Logo";
import Footer from "../components/Footer";

export default function Home() {
  const { handleGetHomePageProducts } = useProduct();
  const { products, loading } = useSelector((state) => state.products);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await handleGetHomePageProducts();
      } catch (error) {
        toast.error(error.message || "Failed to load products");
      }
    };

    loadProducts();
  }, []);

  console.log(products);

  return (
    <main className="min-h-screen bg-background ">
      <Header />

      <section className="mx-auto w-full">
        <div className="w-full py-20 px-4 md:px-8">
          <Logo />
        </div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2  border-r border-y border-border px-4 py-6 md:p-8">
            <h3 className="text-sm font-mono text-primary uppercase tracking-wide">
              Outfit
            </h3>
            <p className="text-base font-semibold mt-4 leading-relaxed">
              Created by Rishi Tiwari, this store and collection
              celebrates our collective creativity and passion for apparel.
            </p>
          </div>
          <div className="space-y-2 border-r border-y flex flex-col justify-between border-border px-4 py-6 md:p-8">
            <h3 className="text-sm font-mono text-primary uppercase tracking-wide">
              Why
            </h3>
            <p className="text-base lg:border-t border-border leading-relaxed">
              Carefully designed for those who appreciate the intersection of
              typography and utility.
            </p>
          </div>
          <div className="space-y-2 border-r border-y flex flex-col justify-between border-border px-4 py-6 md:p-8">
            <h3 className="text-sm font-mono uppercase tracking-wide">
              View our collection
            </h3>
            <Link to="/collections">
              <Button variant="link" className="text-sm p-0 font-medium underline underline-offset-4">
                View Collection
              </Button>
            </Link>
          </div>
          <div className="space-y-2 border-y flex flex-col justify-between border-border px-4 py-6 md:p-8">
            <h3 className="text-sm font-mono text-primary uppercase tracking-wide">
              © {new Date().getFullYear()} Outfit
            </h3>
            <p>SHIPPING & RETURNS</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full">
          <div className="overflow-hidden w-full lg:w-1/2 lg:border-r border-border">
            <img
              src="./images/image.png"
              loading="lazy"
              className="h-full min-h-70 w-full object-cover"
              alt=""
            />
          </div>
          <div className="px-4 py-6 sm:px-10 md:px-14 lg:px-20 lg:py-10 flex flex-col w-full lg:w-1/2 justify-center border-stone-700">
            <p className="text-primary font-mono text-sm sm:text-base">
              NEW ARRIVAL
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-[5.5rem] font-roboto-condensed leading-tight sm:leading-[1.1] lg:leading-20 uppercase font-bold">
              Made to be worn. Or judged. Or both.
            </h1>

            <p className="mt-6 sm:mt-8 lg:mt-10 max-w-xl text-sm sm:text-base">
              Our signature metallic tote, designed to reflect the environment
              while maintaining a rigid structural grid. Built for the creative
              operative.
            </p>
          </div>
        </div>

        <div className="h-24 border border-border flex items-center p-4 justify-between">
          <h2 className="text-2xl font-roboto-condensed font-bold ">
            Our Collection
          </h2>
          <Button variant="link" onClick={() => navigate("/collections")}>
            View Collection
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {products?.length > 0 ? (
            products.map((product) => (
                <Link
                  to={`/products/${product._id}`}
                  className="flex h-full border-r border-b-[0.5px] border-border cursor-pointer flex-col overflow-hidden"
                >
                {/* Image Section */}
                <div className="relative border-b border-border overflow-hidden w-full aspect-4/5 bg-muted">
                  {
                    <div className="absolute">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full hover:opacity-0 duration-500 ease-in-out w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  }
                  {
                    <img
                      src={product.images[1]}
                      alt={product.title}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  }
                </div>

                {/* Content Section */}
                <div className="flex   flex-col p-4">
                  {/* Title */}
                  <h3 className="font-roboto-condensed uppercase text-sm font-normal text-foreground overflow-hidden">
                    {product.title}
                  </h3>

                  {/* Price at Bottom */}
                  <div className="mt-1">
                    <p className="text-md text-primary uppercase font-mono">
                      {`Rs.${product.price}`}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-muted-foreground">
              No products available.
            </p>
          )}
        </div>

        <div className="bg-primary mt-16 md:mt-20 px-4 py-8 md:py-16 md:px-8">
          <h2 className="text-4xl  md:text-5xl lg:text-6xl mb-4 md:mb-8 max-w-3xl font-bold text-white">
            Collective creativity for high-end creative minds.
          </h2>
          <p className=" max-w-2xl text-white">
            Every piece in the OUTFIT collection is a testament to our design
            philosophy: minimalism without compromise, structural honesty, and a
            relentless pursuit of typographic perfection.
          </p>
        </div>

        <Footer />
      </section>
    </main>
  );
}
