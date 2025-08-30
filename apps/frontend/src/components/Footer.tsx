import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="w-full bg-gray-50 mt-50 sm:px-6">
      <div className="container mx-auto py-12 px-2 ">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">GNR</h3>
            <div className="mb-4 flex gap-4 items-center pb-4 border-b">
              <Link
                href={
                  "https://www.instagram.com/giftsnribbonsindia?utm_source=ig_web_button_share_sheet&igsh=MTA4aWVoN3dmNzExNg=="
                }
                target="_blank"
                className="p-2 cursor-pointer rounded-full text-xl "
              >
                <FaInstagram />
              </Link>
            </div>
            <p className="text-[var(--para-primary)]">
              We are committed to delivering the best services and products to
              our customers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-[var(--para-primary)] ">
              <li>
                <a href="#" className="hover:text-black ">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className=" hover:text-black">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-[var(--para-primary)]">
              <li>
                Email:
                <a className="ml-2" href="mailto:giftsandribbons25@gmail.com">
                  giftsandribbons25@gmail.com
                </a>
              </li>
              <li>Phone: +91 95183 02817</li>
              <li>
                Address: 303 Uma Avenue, Hanuman Colony, Nashik, Maharashtra
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center text-[var(--para-primary)] text-sm">
          © {new Date().getFullYear()} Gift&apos;s and Ribbon&apos;s. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
