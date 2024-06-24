import { addToCart } from "../rtk/slices/cartSlice";
import { PiShoppingCartLight } from "react-icons/pi";
import { useAppDispatch } from "../hooks/useRedux";
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { useState } from "react";
import ProductImages from "./ProductImages";
import { motion } from "framer-motion";
const ProductDetails = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useAppDispatch();
  const product = {
    name: "Fall Limited Edition Sneakers",
    originalPrice: 250,
    discount: 50,
    companyName: "Sneaker Company",
    priceAfterDiscount: 125,
    description: `These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.`,
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity, id: Date.now() }));
    setQuantity(1);
  };

  return (
    <div className="flex pb-5 justify-around  max-lg:flex-col gap-10 lg:gap-16 xl:gap-32  items-center">
      <div className="flex-1 lg:max-w-[30rem]">
        <div className="max-lg:hidden">
          <ProductImages />
        </div>
        <div className="lg:hidden">
          <ProductImages showSwtch={true} />
        </div>
      </div>
      <div className="flex-1">
        <div className="space-y-4">
          <h2 className="max-lg:text-base text-lg font-bold uppercase text-primary-orange">
            {product.companyName}
          </h2>
          <h1 className=" text-3xl lg:text-4xl xl:text-6xl font-bold text-neutral-black">
            {product.name}
          </h1>
        </div>
        <p className="text-neutral-dark-grayish-blue max-md:text-lg text-xl mt-12">
          {product.description}
        </p>

        {!product.priceAfterDiscount && (
          <h3 className="text-2xl font-bold text-neutral-very-dark-blue">
            ${product.priceAfterDiscount}
          </h3>
        )}
        {product.priceAfterDiscount && (
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-8 ">
              <h3 className="text-2xl font-bold text-neutral-very-dark-blue">
                ${product.priceAfterDiscount}
              </h3>

              <h4 className="px-3 text-center py-1 bg-primary-pale-orange text-primary-orange rounded-lg ">
                {product.discount}%
              </h4>
            </div>
            <h4 className="text-neutral-very-dark-blue lg:hidden mt-3 line-through font-bold">
              ${product.originalPrice}
            </h4>
          </div>
        )}

        {product.priceAfterDiscount && (
          <h4 className="text-neutral-very-dark-blue max-lg:hidden mt-3 line-through font-bold">
            ${product.originalPrice}
          </h4>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-4 mt-8 max-lg:flex-col "
        >
          <fieldset className="w-[200px] max-lg:w-full flex items-center font-bold justify-between px-3 py-4 rounded-lg bg-neutral-light-grayish-blue">
            <motion.button
              type="button"
              disabled={quantity === 1}
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            >
              <FiMinus className="inc_dec_btn" />
            </motion.button>
            <input
              type="number"
              disabled
              value={quantity}
              className="outline-none bg-transparent w-full text-center"
            />
            <motion.button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            >
              <MdAdd className="inc_dec_btn" />
            </motion.button>
          </fieldset>

          <motion.button
            whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
            type="submit"
            className="add_to_cart_btn"
          >
            <PiShoppingCartLight className="text-3xl" />
            <span>Add to cart</span>
          </motion.button>
        </form>
      </div>
    </div>
  );
};
export default ProductDetails;
