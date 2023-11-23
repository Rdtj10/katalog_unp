import Layout from "../components/Layout";
import Transition from "../components/Transition";
import "../styles/globals.css";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import { SessionProvider } from "next-auth/react";
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  const router = useRouter();
  return (
    <SessionProvider session={session}>
      <Layout>
      <AnimatePresence mode="wait">
        <motion.div key={router.route} className="h-fit">
          <Transition />
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </Layout>
    </SessionProvider>
    
  );
}

export default MyApp;
