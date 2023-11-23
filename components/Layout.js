import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

const Layout = ({children}) => {
  {/* Fungsi Utama */}
  return (
    <div className="relative flex flex-col min-h-screen">
      <div className="top-0 z-50">
        <Header />
      </div>
      <div className="flex-1">
        <ToastContainer/>
        {children}
      </div>
      <div className="relative w-full bottom-0">
        <Footer />
      </div>
      
    </div>
  );
};

export default Layout;
