import ProductImages from "./ProductImages";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { CgClose } from "react-icons/cg";
import { useAppDispatch } from "../hooks/useRedux";
import { setShowModal } from "../rtk/slices/modalSlice";
const ImageViewer = () => {
  const dispatch = useAppDispatch();
  return ReactDOM.createPortal(
    <>
      <motion.div
        initial={{ y: "-100vh", opacity: 0 }}
        animate={{ y: "0vh", opacity: 1, transition: { duration: 0.5 } }}
        exit={{ y: "-100vh", opacity: 0 , transition: { duration: 0.5 }}}
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
    </>,
    document.getElementById("image-viewer") as HTMLElement
  );
};

export default ImageViewer;
