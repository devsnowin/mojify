import { type ReactNode } from "react";
import Footer from "../Footer";
import Header from "../Header";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="grid min-h-screen grid-rows-[auto_1fr_auto]">
      <Header />
      {children}
      <Footer />
    </main>
  );
};
export default Layout;
