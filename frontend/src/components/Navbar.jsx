import React from "react";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-4">
      <a href="#" className="block w-[5rem] xl:mr-8">
        <img src={logo} width={50} height={20} alt="logo" />
      </a>

      <nav className="flex top-[7rem] left-0 right-0 bottom-0 bg-color-2 static ml-auto bg-transparent">
        <div className="relative z-2 flex flex-col items-center justify-center m-auto">
          <a
            href="#"
            className="block relative font-code text-s uppercase text-n-11 transition-colors hover:text-n-1 px-6 py-6 md:py-8 -mr-0.25  font-semibold leading-5 xl:px-12"
          >
            Sam Chat Application
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
