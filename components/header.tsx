"use client";
import React from "react";

import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
const Header = () => {
  return (
    <header className="h-14 px-4 flex items-center gap-5 border-b fixed backdrop-blur bg-white/30 w-full z-50">
      <Link href={"/"}>
        <Image src={logo} width={30} height={30} alt="Logo" />
      </Link>
      <Link href={"/"}>
        <h1 className="bg-gradient-to-l from-blue-400 to-purple-600 bg-clip-text text-transparent font-bold">
          Thần số học
        </h1>
      </Link>
    </header>
  );
};

export default Header;
