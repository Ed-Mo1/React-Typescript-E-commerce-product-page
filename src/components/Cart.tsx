import { useAppSelector, useAppDispatch } from "../hooks/useRedux";
import {
  removeItem,
  resetCart,
  decreaseAmount,
  increaseAmount,
  type Product,
} from "../rtk/slices/cartSlice";
import { CgMathPlus } from "react-icons/cg";
import { AnimatePresence, motion } from "framer-motion";
import img from "../assets/images/image-product-1-thumbnail.jpg";
import { FiMinus } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { FaTrashCan } from "react-icons/fa6";

type CartItemProps = {
  item: Product;
  index?: number;
  dispatch: ReturnType<typeof useAppDispatch>;
};

type QuantityButtonProps = CartItemProps & {
  actionType: "decrease" | "increase";
};

type RemoveButtonProps = CartItemProps;

const Cart = () => {
  const dispatch = useAppDispatch();
  const { products, totalPrice } = useAppSelector((state) => state.cart);

  return (
    <div className="rounded-lg overflow-x-hidden shadow-xl bg-white">
      <div className="flex px-4 pt-4 pb-6 border-b border-gray-300 justify-between items-center">
        <h2 className="text-2xl">Cart</h2>
        <h3>
          Total Price: <span className="font-bold">${totalPrice}</span>
        </h3>
      </div>

      <div
        className={`min-h-[250px] max-h-[250px] overflow-x-hidden overflow-y-auto ${
          products.length === 0 && "grid place-content-center"
        }`}
      >
        <AnimatePresence mode="popLayout">
          {products.length ? (
            products.map((item, i) => (
              <CartItem
                index={i}
                key={item.id}
                item={item}
                dispatch={dispatch}
              />
            ))
          ) : (
            <EmptyCartMessage />
          )}
        </AnimatePresence>
      </div>

      <div className="py-2 px-4">
        <CheckoutButton dispatch={dispatch} />
      </div>
    </div>
  );
};

const CartItem = ({ item, index, dispatch }: CartItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, translateX: 10, transitionDuration: "0.1s" }}
      animate={{ opacity: 1, translateX: 0, transitionDuration: "0.1s" }}
      exit={{
        opacity: 0,
        translateX: 10,
        transitionDuration: "0.1s",
        transitionDelay: `${(index as number) * 0.4}s`,
      }}
      className="flex overflow-x-hidden items-center justify-between px-6 py-3 border-b border-gray-300"
    >
      <CartItemDetails item={item} />
      <RemoveButton item={item} dispatch={dispatch} />
    </motion.div>
  );
};

const CartItemDetails = ({ item }: { item: Product }) => {
  return (
    <div className="flex items-center gap-4">
      <img src={img} alt="product" className="w-16 aspect-square rounded-lg" />
      <CartItemDetailsContainer item={item} />
    </div>
  );
};

const CartItemDetailsContainer = ({ item }: { item: Product }) => {
  return (
    <div>
      <CartItemName item={item} />
      <CartItemPrice item={item} />
      <CartItemQuantity item={item} />
    </div>
  );
};

const CartItemName = ({ item }: { item: Product }) => {
  return <h4 className="max-md:text-base text-lg">{item.name}</h4>;
};

const CartItemPrice = ({ item }: { item: Product }) => {
  const totalPrice = (item.priceAfterDiscount as number) * item.quantity;
  return (
    <div className="flex items-center gap-2 max-md:text-sm">
      <span>${item.priceAfterDiscount}</span>
      <CgMathPlus className="rotate-45" />
      <span>{item.quantity}</span>
      <span className="font-bold">${totalPrice}</span>
    </div>
  );
};

const CartItemQuantity = ({ item }: { item: Product }) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex items-center gap-4 justify-self-end">
      <QuantityButton item={item} dispatch={dispatch} actionType="decrease" />
      <p>{item.quantity}</p>
      <QuantityButton item={item} dispatch={dispatch} actionType="increase" />
    </div>
  );
};

const QuantityButton = ({
  item,
  dispatch,
  actionType,
}: QuantityButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
      type="button"
      onClick={() =>
        dispatch(
          actionType === "decrease"
            ? decreaseAmount(item)
            : increaseAmount(item)
        )
      }
    >
      {actionType === "decrease" ? (
        <FiMinus className="inc_dec_btn max-md:text-base text-lg" />
      ) : (
        <MdAdd className="inc_dec_btn max-md:text-base text-lg" />
      )}
    </motion.button>
  );
};

const RemoveButton = ({ item, dispatch }: RemoveButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
      type="button"
      className="text-gray-300 max-md:text-base text-lg"
      onClick={() => dispatch(removeItem(item))}
    >
      <FaTrashCan />
    </motion.button>
  );
};

const EmptyCartMessage = () => {
  return <h5 className="text-gray-300 font-bold">Your cart is empty.</h5>;
};

const CheckoutButton = ({
  dispatch,
}: {
  dispatch: ReturnType<typeof useAppDispatch>;
}) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
      type="button"
      className="w-full py-3 text-lg font-bold text-white bg-primary-orange rounded-lg"
      onClick={() => dispatch(resetCart())}
    >
      Checkout
    </motion.button>
  );
};

export default Cart;
