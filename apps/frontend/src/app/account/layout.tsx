"use client";

import Link from "next/dist/client/link";
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const linkClasses = (href: string) =>
    `block text-sm
     ${pathname === href ? "text-teal-500 font-bold" : ""}`;

  return (
    <main>
      <div className="container lg:max-w-4xl mx-auto my-10 px-4">
        <div className="mb-2">
          <h2 className="font-bold m-0 p-0">Account</h2>
          <p className="text-sm m-0 p-0">Sharmil</p>
        </div>
        <div className="hidden md:border-t md:grid md:grid-cols-4">
          <div className="px-2 cols-span-1 border-r">
            <div className="border-b py-4">
              <Link href={`/account`} className={linkClasses("/account")}>
                Overview
              </Link>
            </div>
            <div className="border-b py-4">
              <p className="text-xs text-gray-400 mb-2">Account</p>
              <Link
                href={`/account/user`}
                className={linkClasses("/account/user")}
              >
                Profile
              </Link>
              <Link
                href={`/account/user/edit`}
                className={linkClasses("/account/user/edit")}
              >
                Edit Profile
              </Link>
            </div>
            <div className="border-b py-4">
              <p className="text-xs text-gray-400 mb-2">Orders</p>
              <Link
                href={`/account/orders`}
                className={linkClasses("/account/orders")}
              >
                Orders & Returns
              </Link>
            </div>
            <div className="border-b py-4">
              {" "}
              <p className="text-xs text-gray-400 mb-2">Liked</p>
              <Link href={`/wishlist`} className={linkClasses("/wishlist")}>
                Wishlist
              </Link>
            </div>
          </div>
          <div className="col-span-3 ">{children}</div>
        </div>
        <div className="md:hidden">{children}</div>
      </div>
    </main>
  );
}
