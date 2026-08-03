import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Hero from "./Hero";
import Navigation from "./Navigation";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default RootLayout;