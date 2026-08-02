import Footer from "@/features/products/components/Footer";
import Header from "@/features/products/components/Header";
import { Outlet } from "react-router-dom";


export default function AppLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}