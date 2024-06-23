import ProductImages from "./ProductImages";
import ReactDOM from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { useAppDispatch } from "../hooks/useRedux";
import { setShowModal } from "../rtk/slices/modalSlice";
const ImageViewer = () => {
  const dispatch = useAppDispatch();
  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        className="fixed inset-0 w-full z-50 h-full flex justify-center items-center "
      >
        <div className="max-w-[500px] relative ">
          <ProductImages showSwtch={true} />
          <button
            onClick={() => dispatch(setShowModal(false))}
            className="absolute z-[60] w-fit h-fit -top-1 -right-2 text-xl bg-white rounded-full p-1  text-neutral-black"
          >
            <CgClose />
          </button>
        </div>
      </motion.div>

      <div className="fixed inset-0 w-full h-full bg-black/70 z-40"></div>
    </AnimatePresence>,
    document.getElementById("image-viewer") as HTMLElement
  );
};

export default ImageViewer;
