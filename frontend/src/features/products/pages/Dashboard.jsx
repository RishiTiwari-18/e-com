import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner.jsx";
import { toast } from "sonner";
import useProduct from "../hooks/useProduct";
import { Button } from "@/components/ui/button";
import Heading from "@/components/heading";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {  Edit, Package, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

const getStatus = (units) => {
  if (units <= 0) return { label: "Out of Stock", className: "bg-destructive/10 text-destructive-foreground" };
  if (units <= 10) return { label: "Low Stock", className: "bg-amber-500/10 text-amber-700 dark:text-amber-400" };
  return { label: "Active", className: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400" };
};

const getImageSrc = (product) => {
  if (product.images && Array.isArray(product.images) && product.images[0]) {
    return product.images[0];
  }
  return null;
};

export default function Dashboard() {
  const { handleGetSellerProducts } = useProduct();
  const { sellerProducts, loading } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const productsToDisplay =
    sellerProducts && sellerProducts.length > 0 ? sellerProducts : [];



  useEffect(() => {
    const loadProducts = async () => {
      try {
        await handleGetSellerProducts();
      } catch (error) {
        toast.error(error.message || "Failed to load products");
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="min-h-screen">
      <section className=" py-10 w-full space-y-10">
        <div className="flex px-4 md:px-8 flex-col gap-4 mb-20 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink render={<Link to="/" />}>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Heading>Your products</Heading>
          </div>

          <Button
            variant="link"
            onClick={() => navigate("/seller/create-product")}
            className="text-sm font-medium underline underline-offset-4"
          >
            Add a new product
          </Button>
        </div>

        {loading ? (
          <div className="flex min-h-72 items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div className="px-4 md:px-8">
            <div className="overflow-hidden rounded-lg border border-border bg-card text-card-foreground">
              <div className="hidden md:grid grid-cols-[1.8fr_1fr_1fr_1fr_1fr_0.6fr] gap-4 px-6 py-4 text-sm font-medium text-muted-foreground border-b border-border bg-muted/30">
                <div>Product</div>
                <div>ID</div>
                <div>Price</div>
                <div>Inventory</div>
                <div>Status</div>
                <div className="text-right">Actions</div>
              </div>

              <ul className="divide-y divide-border">
                {productsToDisplay.map((product) => {
                  const productId = product._id || product.id;
                  const inventory = product.units ?? product.inventory ?? 0;
                  const status = getStatus(inventory);
                  const imageSrc = getImageSrc(product);

                  return (
                    <li
                      key={productId}
                      className="grid grid-cols-1 md:grid-cols-[1.8fr_1fr_1fr_1fr_1fr_0.6fr] gap-4 items-center px-4 md:px-6 py-4 md:py-5 hover:bg-muted/30 transition-colors"
                    >
                      {/* Product: image + name */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="relative shrink-0 h-16 w-16 md:h-20 md:w-20 rounded-md border border-border overflow-hidden bg-background flex items-center justify-center">
                          {imageSrc ? (
                            <img
                              src={imageSrc}
                              alt={product.title || ""}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <Package className="h-8 w-8 text-muted-foreground/60" />
                          )}
                        </div>
                        <div className="min-w-0 flex flex-col gap-0.5">
                          <span className="font-medium text-primary truncate text-base">
                            {product.title}
                          </span>
                          {product.category && (
                            <span className="text-xs capitalize text-muted-foreground">
                              {product.category}
                              {product.size ? ` • ${product.size}` : ""}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* ID (mobile: label above) */}
                      <div className="flex flex-col md:block gap-0.5">
                        <span className="md:hidden text-xs font-medium text-muted-foreground">
                          ID
                        </span>
                        <span className="font-mono text-xs text-muted-foreground md:text-sm md:text-muted-foreground/90 truncate">
                          #{String(productId).slice(-8)}
                        </span>
                      </div>

                      {/* Price */}
                      <div className="flex flex-col md:block gap-0.5">
                        <span className="md:hidden text-xs font-medium text-muted-foreground">
                          Price
                        </span>
                        <span className="font-medium tabular-nums text-primary md:text-sm">
                          Rs.{Number(product.price).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>

                      {/* Inventory */}
                      <div className="flex flex-col md:block gap-0.5">
                        <span className="md:hidden text-xs font-medium text-muted-foreground">
                          Inventory
                        </span>
                        <span
                          className={cn(
                            "font-medium tabular-nums",
                            inventory === 0
                              ? "text-destructive-foreground"
                              : inventory <= 10
                              ? "text-amber-600 dark:text-amber-500"
                              : "text-primary"
                          )}
                        >
                          {inventory} {inventory === 1 ? "unit" : "units"}
                        </span>
                      </div>

                      {/* Status */}
                      <div className="flex flex-col items-start md:block gap-0.5">
                        <span className="md:hidden text-xs font-medium text-muted-foreground">
                          Status
                        </span>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                            status.className
                          )}
                        >
                          <span
                            className={cn(
                              "mr-1.5 inline-block h-1.5 w-1.5 rounded-full",
                              status.label === "Active" && "bg-emerald-500",
                              status.label === "Low Stock" && "bg-amber-500",
                              status.label === "Out of Stock" && "bg-destructive",
                            )}
                          />
                          {status.label}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex md:justify-end gap-5 pt-1 md:pt-0">
                        <button className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-muted-foreground/80">
                          <Edit />
                        </button>
                        <button className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-muted-foreground/80">
                          <Trash2 />
                        </button>
                        </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
