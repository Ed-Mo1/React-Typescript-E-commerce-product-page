import React from "react";
import { type NavLinks } from "./Header";
import { MdOutlineClose } from "react-icons/md";
import { motion } from "framer-motion";
const NavSide = ({
  navLinks,
  setShowNav,
}: {
  navLinks: NavLinks[];
  setShowNav: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        className="fixed lg:hidden flex  flex-col gap-10 max-sm:w-full max-md:w-[75%] w-[35%] bg-white h-screen top-0 left-0 py-12 px-6 z-50 m-0"
      >
        <div>
          <button
            className="text-4xl text-neutral-dark-grayish-blue"
            onClick={() => setShowNav(false)}
          >
            <MdOutlineClose />
          </button>
        </div>

        <ul className="flex flex-col gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <a
                href={link.to}
                className="text-lg text-neutral-very-dark-blue font-bold"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
      <div className="absolute inset-0 w-full h-full bg-black/50 z-40"></div>
    </>
  );
};

export default NavSide;
