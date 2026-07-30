import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner.jsx";
import { toast } from "sonner";
import useProduct from "../hooks/useProduct";
import { Button } from "@/components/ui/button";
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

export default function Dashboard() {
  const { handleGetAllProducts } = useProduct();
  const { sellerProducts, loading } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const fakeProducts = [
    {
      id: "PRD-1001",
      title: "Wireless Mouse",
      price: 29.99,
      inventory: 42,
      status: "Active",
    },
    {
      id: "PRD-1002",
      title: "Mechanical Keyboard",
      price: 89.0,
      inventory: 18,
      status: "Low Stock",
    },
    {
      id: "PRD-1003",
      title: "USB-C Hub",
      price: 49.5,
      inventory: 0,
      status: "Out of Stock",
    },
  ];

  const productsToDisplay =
    sellerProducts?.length > 0 ? sellerProducts : fakeProducts;

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
      <Header />
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
          <div className="overflow-x-auto rounded-lg border border-stone-200">
            <table className="min-w-full text-sm">
              <thead className="bg-stone-100 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium text-stone-700">Product</th>
                  <th className="px-4 py-3 font-medium text-stone-700">ID</th>
                  <th className="px-4 py-3 font-medium text-stone-700">Price</th>
                  <th className="px-4 py-3 font-medium text-stone-700">Inventory</th>
                  <th className="px-4 py-3 font-medium text-stone-700">Status</th>
                  <th className="px-4 py-3 font-medium text-stone-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {productsToDisplay.map((product) => (
                  <tr key={product.id} className="border-t border-stone-200">
                    <td className="px-4 py-3 text-stone-900">{product.title}</td>
                    <td className="px-4 py-3 text-stone-600">{product.id}</td>
                    <td className="px-4 py-3 text-stone-900">${Number(product.price).toFixed(2)}</td>
                    <td className="px-4 py-3 text-stone-900">{product.inventory ?? 0}</td>
                    <td className="px-4 py-3 text-stone-700">{product.status || "Active"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <button className="text-blue-600 hover:underline">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
