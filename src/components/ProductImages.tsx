import img1 from "../assets/images/image-product-1.jpg";
import img2 from "../assets/images/image-product-2.jpg";
import img3 from "../assets/images/image-product-3.jpg";
import img4 from "../assets/images/image-product-4.jpg";
import imgThumb1 from "../assets/images/image-product-1-thumbnail.jpg";
import imgThumb2 from "../assets/images/image-product-2-thumbnail.jpg";
import imgThumb3 from "../assets/images/image-product-3-thumbnail.jpg";
import imgThumb4 from "../assets/images/image-product-4-thumbnail.jpg";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useAppDispatch } from "../hooks/useRedux";
import { setShowModal } from "../rtk/slices/modalSlice";
const ProductImages = ({ showSwtch }: { showSwtch?: boolean }) => {
  const mainImages: string[] = [img1, img2, img3, img4];
  const thumbImages: string[] = [imgThumb1, imgThumb2, imgThumb3, imgThumb4];
  const [activeImage, setActiveImage] = useState<number>(0);

  const dispatch = useAppDispatch();
  return (
    <div className="space-y-4 flex-1">
      <AnimatePresence mode="wait" initial={false}>
        <div className="relative">
          <motion.img
            onClick={() => {
              const mediaQuery = window.matchMedia("(min-width: 1024px)");
              if (mediaQuery.matches) {
                dispatch(setShowModal(true));
              }
            }}
            key={activeImage}
            initial={{ opacity: 0, translateX: 10, transitionDuration: "0.1s" }}
            animate={{ opacity: 1, translateX: 0, transitionDuration: "0.1s" }}
            exit={{ opacity: 0, translateX: 10, transitionDuration: "0.1s" }}
            src={mainImages[activeImage]}
            className="rounded-lg lg:cursor-pointer"
            alt="image"
          />
          {showSwtch && (
            <>
              <button
                className="absolute cursor-pointer top-1/2 right-[5%] translate-x-1/2 -translate-y-1/2 text-xl md:text-3xl p-1 bg-white  text-neutral-black rounded-full"
                onClick={() => {
                  if (activeImage < mainImages.length - 1) {
                    setActiveImage(activeImage + 1);
                  } else {
                    setActiveImage(0);
                  }
                }}
              >
                <IoIosArrowForward />
              </button>
              <button
                className="absolute cursor-pointer top-1/2 left-[5%] -translate-x-1/2 -translate-y-1/2 text-xl md:text-3xl p-1 bg-white  text-neutral-black rounded-full"
                onClick={() => {
                  if (activeImage > 0) {
                    setActiveImage(activeImage - 1);
                  } else {
                    setActiveImage(mainImages.length - 1);
                  }
                }}
              >
                <IoIosArrowBack />
              </button>
            </>
          )}
        </div>
      </AnimatePresence>
      <div className="max-lg:hidden grid grid-cols-4 gap-4">
        {thumbImages.map((image, index) => (
          <motion.button
            key={index}
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            onClick={() => setActiveImage(index)}
            className="before:inset-0 outline-none before:w-full relative hover:before:absolute before:h-full before:rounded-lg before:bg-white before:bg-opacity-30"
          >
            <img
              key={index}
              src={image}
              alt="image"
              className={`rounded-lg cursor-pointer  ${
                index === activeImage ? "border-2 border-primary-orange" : ""
              }`}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
