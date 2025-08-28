"use client";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "apps/frontend/src/redux/hook";
import {
  fetchProductById,
  fetchProducts,
} from "apps/frontend/src/redux/productSlice";
import { useParams, useRouter } from "next/navigation";
import { FaCalendarAlt } from "react-icons/fa";

import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import {
  addItemToCart,
  toggleSidebar,
} from "apps/frontend/src/redux/cartSlice";
import Link from "next/link";
import ProductCard from "apps/frontend/src/components/cards/productCard";
import { addToWishlist } from "apps/frontend/src/serviceProvider/wishlist_services";
import { CiHeart, CiShoppingCart } from "react-icons/ci";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "apps/frontend/src/components/ui/carousel";
import { Card, CardContent } from "apps/frontend/src/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import { getProductsByCategory } from "apps/frontend/src/serviceProvider/productService";
import { toast } from "sonner";

export default function SingleProduct() {
  const params = useParams();
  const productId = params.id;
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useAppDispatch();
  const { login } = useAppSelector((state) => state.user);
  const router = useRouter();
  const singleProduct = useAppSelector(
    (state: any) => state.products.singleProduct
  );

  const product = singleProduct && singleProduct[0] ? singleProduct[0] : null;
  const [wishlisted, setWishlisted] = useState(product?.wishlist || false);

  async function handleAddtoCart(product: any) {
    try {
      if (!login)
        return toast(`Please Login First →`, {
          action: {
            label: "Login",
            onClick: () => router.push("/auth/login"),
          },
        });
      await dispatch(
        addItemToCart({
          productId: product._id,
          quantity: quantity,
          price: product.price,
        })
      );
      dispatch(toggleSidebar(true));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleWishlist(productId: string) {
    try {
      if (!login)
        return toast(`Please Login First →`, {
          action: {
            label: "Login",
            onClick: () => router.push("/auth/login"),
          },
        });
      await addToWishlist(productId);
      setWishlisted(true);
      toast(`${product.name} Added To Wishlist`, {
        action: {
          label: "Close",
          onClick: () => console.log("close"),
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function getRelatedProducts() {
    const data = await getProductsByCategory([product?.category]);
    setRelatedProducts(data);
  }

  useEffect(() => {
    if (productId && typeof productId === "string") {
      dispatch(fetchProductById(productId));
      dispatch(fetchProducts());
      getRelatedProducts();
    }
  }, [dispatch]);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <div className="container mx-auto py-5 mb-10 px-4">
      <p className=" flex items-center gap-2 text-md text-[var(--para-primary)] sm:font-semi-bold tracking-tight mb-5">
        <Link href={`/products`} className="hover:text-black ">
          &larr; Products
        </Link>
        <i className="text-sm text-[var(--para-primary)]">
          <GoDotFill />
        </i>
        <span className="text-black">{product?.name}</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 mb-16 md:mb-20  ">
        <div className="hidden lg:grid sm:col-span-6 lg:col-span-7 grid-cols-1 lg:grid-cols-2 h-150 overflow-scroll no-scrollbar lg:h-auto gap-2 w-full  justify-self-center">
          {product?.images.length > 0 &&
            product.images.map((image: string, index: number) => (
              <img
                key={index}
                src={image}
                alt={product.name}
                className="w-full h-100 border border-2 md:border-4 border-white cursor-pointer"
              />
            ))}
        </div>
        <div className="block col-span-6 lg:hidden mb-4">
          <Carousel
            plugins={[plugin.current]}
            className="w-full align-self-center mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {product?.images.map((image: string, index: number) => (
                <CarouselItem key={index}>
                  <div>
                    <Card className="w-80 shadow-none md:p-0 mx-auto border-none rounded-none">
                      <CardContent className="flex items-center justify-center">
                        <img
                          key={index}
                          src={image}
                          alt={product.name}
                          className="w-full h-100 cursor-pointer"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 hover:bg-teal-600 hover:text-white transition-all duration-200" />
            <CarouselNext className="right-0 hover:bg-teal-600 hover:text-white transition-all duration-200" />
          </Carousel>
        </div>
        <div className="col-span-6 lg:col-span-5 w-full justify-self-start">
          <div className="border-b border-gray-300 mb-4 pb-2">
            <h3 className="font-cormorant text-xl font-bold tracking-wide">
              {product?.name}
            </h3>
            <span className="inline-block text-lg text-[var(--para-primary)]">
              {product?.category}
            </span>
          </div>
          <p className="  text-xl mb-2 font-bold">
            <span className="text-gray-700 text-lg">MRP</span> &#8377;{" "}
            {product?.price}
          </p>

          <div className="flex  mb-4">
            <div className="flex border border-gray-300 items-center justify-start">
              <button
                className="px-2 text-md cursor-pointer font-bold"
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <p className="px-2 text-md border-r border-l border-gray-300">
                {quantity < 1 ? 1 : quantity}
              </p>
              <button
                className="px-2 text-md cursor-pointer font-bold"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-6 border-b border-gray-300 pb-4">
            <button
              onClick={() => {
                handleAddtoCart(product);
              }}
              className="flex items-center gap-2 px-6 py-2 text-white border font-semibold bg-teal-500 cursor-pointer hover:bg-teal-600"
            >
              <CiShoppingCart size={20} />{" "}
              <span className="text-base">Add To Cart</span>
            </button>
            {wishlisted || product?.wishlist ? (
              <button className="flex items-center gap-2 p-4 px-6 py-2 text-red-600 border border-red-600 font-semibold cursor-pointer">
                <CiHeart size={20} />
                <span className="text-base ">Wishlisted</span>
              </button>
            ) : (
              <button
                onClick={() => handleWishlist(product._id)}
                className="flex items-center gap-2 p-4 px-6 py-2 border font-semibold cursor-pointer hover:border-black hover:text-black"
              >
                <CiHeart size={20} />
                <span className="text-base">Wishlist</span>
              </button>
            )}
          </div>
          <div className="w-full mb-6">
            <h4 className="text-md font-semibold mb-1 uppercase">
              Description
            </h4>
            <p className="text-[var(--para-primary)]">{product?.description}</p>
          </div>
          <div className="w-full mb-6">
            <h4 className="text-md font-semibold mb-2 uppercase">Features</h4>
            {product &&
              product?.features?.map((feature: string, index: number) => (
                <span
                  key={index}
                  className="inline-block text-[var(--para-primary)] border border-gray-300 px-6  py-2 text-sm mb-2 mr-2"
                >
                  {feature}
                </span>
              ))}
          </div>
          <div className="w-full">
            <h4 className="text-md font-semibold mb-2 uppercase">
              Shipping Details
            </h4>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2 ">
                <i className="p-4 bg-[#F7F7F7] rounded-full">
                  <FaCalendarAlt size={16} />
                </i>
                <div>
                  <h4 className="text-xs text-[var(--para-primary)] ">
                    Estimated Delivery
                  </h4>
                  <p className="text-md">3-5 working days</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <i className="p-4 bg-[#F7F7F7] rounded-full">
                  <FaCalendarAlt size={16} />
                </i>
                <div>
                  <h4 className="text-xs text-[var(--para-primary)]">
                    Pakage{" "}
                  </h4>
                  <p className="text-md">Regular Package</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h3 className="text-2xl md:text-4xl text-[var(--title-primary)] font-bold uppercase tracking-wider text-center mb-6 md:mb-20">
        You might also like this
      </h3>
      {/* <div className="flex gap-6 py-4 w-full overflow-scroll no-scrollbar "> */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {(relatedProducts || [])
          ?.map((relatedProducts: any, index: number) => (
            <ProductCard
              product={relatedProducts}
              key={relatedProducts._id}
              index={""}
              designIndex={null}
            />
          ))
          .slice(0, 5)}
      </div>
    </div>
  );
}
