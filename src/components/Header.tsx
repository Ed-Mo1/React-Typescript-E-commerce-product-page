import logo from "../assets/images/logo.svg";
import { PiShoppingCartLight } from "react-icons/pi";
import Profile from "./Profile";
import { useAppSelector } from "../hooks/useRedux";
import Cart from "./Cart";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TfiMenu } from "react-icons/tfi";
import NavSide from "./NavSide";

export type NavLinks = {
  id: number;
  name: string;
  to: string;
  active: boolean;
};
const Header = () => {
  const { totalItems } = useAppSelector((state) => state.cart);
  const navLinks: NavLinks[] = [
    {
      id: 1,
      name: "Collections",
      to: "#",
      active: false,
    },
    {
      id: 2,
      name: "Men",
      to: "#",
      active: false,
    },
    {
      id: 3,
      name: "Women",
      to: "#",
      active: true,
    },
    {
      id: 4,
      name: "About",
      to: "#",
      active: false,
    },
    {
      id: 5,
      name: "Contact",
      to: "#",
      active: false,
    },
  ];
  const [showCart, setShowCart] = useState<boolean>(false);
  const [showNav, setShowNav] = useState<boolean>(false);
  useEffect(() => {
    showNav
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "auto");
  }, [showNav]);
  return (
    <>
      <div className="flex bg-white  relative max-lg:items-center items-start justify-between pt-6 lg:pt-12 lg:border-b border-neutral-grayish-blue">
        <div className="flex max-lg:items-center items-start gap-8">
          <div className="flex gap-4 items-center">
            <button
              onClick={(): void => setShowNav((prev: boolean) => !prev)}
              className="text-neutral-dark-grayish-blue text-xl md:text-2xl lg:hidden"
            >
              <TfiMenu />
            </button>
            <img src={logo} alt="logo" />
          </div>
          <ul className="gap-5 max-lg:hidden flex items-center">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.to}
                  className={`nav_link ${link.active && "before:absolute"} `}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-lg:gap-5 gap-14 flex items-center">
          <button
            className="relative outline-none"
            onClick={(): void => setShowCart((prev: boolean) => !prev)}
          >
            <PiShoppingCartLight className="text-2xl" />
            <div className="absolute -top-2 -right-2 w-5 h-4 rounded-full bg-primary-orange text-white flex justify-center items-center text-xs font-bold">
              {totalItems}
            </div>
          </button>
          <Profile />
        </div>
        <AnimatePresence>
          {showCart && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute right-0 top-[100%] w-full lg:max-w-[450px]  z-50"
            >
              <Cart />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {showNav && <NavSide navLinks={navLinks} setShowNav={setShowNav} />}
      </AnimatePresence>
    </>
  );
};

export default Header;
