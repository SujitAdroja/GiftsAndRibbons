"use client";
// import { useState } from "react";
import Link from "next/link";
import { CiHeart, CiShoppingCart, CiUser } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { toggleSidebar } from "../redux/cartSlice";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "apps/frontend/src/components/ui/dropdown-menu";
import { logOutUser } from "apps/frontend/src/redux/authSclice";

export default function Navbar() {
  const dispatch = useAppDispatch();
  const { user, login } = useAppSelector((state) => state.user);

  return (
    // <div className="fixed top-0 w-full z-10 shadow-[0_0px_10px_rgba(0,0,0,0.1)] bg-white hidden md:block py-4 font-medium mx-auto">
    <div className="w-full z-10 shadow-[0_0px_10px_rgba(0,0,0,0.1)] bg-white hidden md:block py-4 font-medium mx-auto">
      <div className="container mx-auto flex gap-4 justify-between items-center">
        <div className="flex items-center gap-25 text-[var(--title-primary)]">
          <Link
            href={"/"}
            className="logo cursor-pointer text-black text-2xl font-semibold"
          >
            GNR
          </Link>
          <div className="navItems text-sm text-[var(--text-primary)] hidden md:block">
            <ul className="flex gap-8 cursor-pointer font-bold ">
              <li className="tracking-wide">
                <Link href={"/"}>HOME</Link>
              </li>
              <li className="tracking-wide">
                <Link href={"/products"}>PRODUCTS</Link>
              </li>
              <li className="tracking-wide">
                <Link href={"/about"}>ABOUT</Link>
              </li>
              <li className="tracking-wide">
                <Link href={"/contact"}>CONTACT US</Link>
              </li>
            </ul>
          </div>
        </div>

        {login ? (
          <div className="flex gap-6 items-center">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger className="flex items-center gap-2 border-none focus-:border-none focus:outline-none cursor-pointer">
                <div className="flex flex-col items-center text-[var(--title-primary)]">
                  <CiUser className="relative text-2xl font-500 cursor-pointer" />
                  <span className="text-xs font-bold">Profile</span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-60 mt-5 text-md p-2 border-none shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-none">
                <DropdownMenuLabel>
                  <h3>Welcome {user?.name}</h3>
                  <p className="text-gray-700">{user?.mobile}</p>
                  <DropdownMenuSeparator />
                </DropdownMenuLabel>
                <DropdownMenuItem className="py-1 cursor-pointer text-gray-700 hover:font-semibold hover:rounded-none">
                  <Link href={"/account/user"} className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-1 cursor-pointer text-gray-700 hover:font-semibold hover:rounded-none">
                  <Link href={"/account/orders"} className="w-full">
                    Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-1 cursor-pointer text-gray-700 hover:font-semibold hover:rounded-none">
                  <Link href={"/account/wishlist"} className="w-full">
                    Wishlist
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-1 cursor-pointer text-gray-700 hover:font-semibold hover:rounded-none">
                  <Link href={"/account/user/edit"} className="w-full">
                    Edit Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-1 cursor-pointer text-gray-700 hover:font-semibold hover:rounded-none">
                  <Link href={"/account"} className="w-full">
                    Account
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer py-1 text-gray-700 rounded-none hover:rounded-none"
                  onClick={() => dispatch(logOutUser())}
                >
                  <p className="font-bold">Logout</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex flex-col items-center text-[var(--title-primary)]">
              <CiShoppingCart
                className="relative text-2xl font-500 cursor-pointer"
                onClick={() => dispatch(toggleSidebar(true))}
              />
              <span className="text-xs font-bold">Cart</span>
            </div>

            <Link href={"/wishlist"} className="flex flex-col items-center">
              <CiHeart className="relative text-2xl font-500 cursor-pointer" />
              <span className="text-xs font-bold">Wishlist</span>
            </Link>
          </div>
        ) : (
          <div className="right-nav flex gap-4 items-center  cursor-pointer">
            <Link href={"/auth/login"}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}
