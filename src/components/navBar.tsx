import * as React from "react";
import { useState } from "react";
import NavLinks from "./navLinks";

const NavBar = ({ _site }: any) => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white">
      <div className="flex items-center font-medium justify-around">
        <div className="z-50 p-5 md:w-auto w-full flex justify-between">
          <div className="text-3xl md:hidden" onClick={() => setOpen(!open)}>
            {/* <ion-icon name={`${open ? "close" : "menu"}`}></ion-icon> */}
          </div>
        </div>
        <ul className="md:flex hidden uppercase items-center gap-8 font-[Poppins]">
          <li>
            <a href="/" className="py-7 px-3 inline-block">
              Home
            </a>
          </li>
          <NavLinks _site={_site} />
        </ul>

        {/* Mobile nav */}
        <ul
          className={`
          md:hidden bg-white fixed w-full top-0 overflow-y-auto bottom-0 py-24 pl-4
          duration-500 ${open ? "left-0" : "left-[-100%]"}
          `}
        >
          <li>
            <a href="/" className="py-7 px-3 inline-block">
              Home
            </a>
          </li>
          <NavLinks _site={_site} />
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
