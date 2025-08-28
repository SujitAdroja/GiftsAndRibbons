"use client";

import { useState } from "react";
import { X } from "lucide-react"; // npm install lucide-react
import Link from "next/link";
import { toggleSidebar } from "../redux/cartSlice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { logOutUser } from "../redux/authSclice";
export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const menuItems = [
    { name: "Home", link: "/" },
    { name: "Products", link: "/products" },
    { name: "About Us", link: "/about" },
    { name: "Contact Us", link: "/contact" },
  ];
  const userMenuItems = [
    { name: "Profile", link: "/account/user" },
    { name: "Orders", link: "/account/orders" },
    { name: "Wishlist", link: "/wishlist" },
    { name: "Edit Profile", link: "/account/user/edit" },
  ];

  return (
    <div className="md:hidden w-full z-10 bg-white">
      <div className=" flex items-center justify-between shadow-sm p-2 text-black">
        <Link href={"/"} className="text-xl font-bold">
          GNR
        </Link>

        <div className="flex items-center gap-4">
          <CiShoppingCart
            size={24}
            className="relative font-500 cursor-pointer"
            onClick={() => dispatch(toggleSidebar(true))}
          />

          <button onClick={() => setOpen(true)}>
            <RxHamburgerMenu size={20} />
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-gray-200  opacity-30   z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-2 border-b">
          <h2 className="text-lg font-bold">{user?.name}</h2>
          <button onClick={() => setOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="p-4">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="block text-gray-700 p-2  border-b"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            {userMenuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.link}
                  className="block text-gray-700 p-2  border-b"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          className="border border-black p-1 px-2 absolute bottom-4 border-red-700 text-red-700 left-[50%] translate-x-[-50%] flex justify-center"
          onClick={() => dispatch(logOutUser(user?._id))}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
