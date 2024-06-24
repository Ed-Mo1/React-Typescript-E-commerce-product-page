import Header from "./components/Header";
import ProductDetails from "./components/ProductDetails";
import ImageViewer from "./components/ImageViewer";
import { useAppSelector } from "./hooks/useRedux";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const { showMoadl } = useAppSelector((state) => state.modal);
  return (
    <div className="container flex flex-col gap-8">
      <Header />
      <ProductDetails />
      <AnimatePresence>{showMoadl && <ImageViewer />}</AnimatePresence>
    </div>
  );
};

export default App;
