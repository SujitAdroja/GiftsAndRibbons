"use client";
import { useState } from "react";
import Navbar from "./Navbar";
import CartSideBar from "./sidebar/CartSidebar";
import MobileNavbar from "./MobileNavbar";

export default function ClientLayout() {
  return (
    <div className="relative">
      <Navbar />
      <MobileNavbar />
      <CartSideBar />
    </div>
  );
}
