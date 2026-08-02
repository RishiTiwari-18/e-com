
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner.jsx";
import { toast } from "sonner";
import useProduct from "../hooks/useProduct";
import Heading from "@/components/heading";
import ProductCard from "../components/ProductCard";
import Header from "../components/Header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import CardSkeleton from "../components/CardSkeleton";

export default function CollectionPage() {
  const { handleGetAllProducts } = useProduct();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await handleGetAllProducts();
      } catch (error) {
        toast.error(error.message || "Failed to load products");
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="min-h-screen">
      <section className="px-8 py-10 w-full space-y-10">
        <div className=" mb-20">
          <div className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Collection</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Heading>Collection</Heading>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </div>
        ) : products.length === 0 ? (
          <div className="space-y-4 py-12">
            <p className="text-lg font-medium text-stone-900">
              No products yet.
            </p>
            <p className="text-sm text-stone-500">
              Once you create a product it will show up here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

