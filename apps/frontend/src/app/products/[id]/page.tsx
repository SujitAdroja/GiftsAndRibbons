"use client";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "apps/frontend/src/redux/hook";
import {
  fetchProductById,
  fetchProducts,
  Product,
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
  const productId = params.id as string;
  const [quantity, setQuantity] = useState<number>(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const dispatch = useAppDispatch();
  const { login } = useAppSelector((state) => state.user);
  const router = useRouter();

  // correctly typed selector
  const singleProduct: Product[] =
    useAppSelector((state) => state.products.singleProduct) ?? [];

  const product = singleProduct?.[0] || null;
  const [wishlisted, setWishlisted] = useState<boolean>(
    product?.wishlist ?? false
  );

  async function handleAddtoCart() {
    try {
      if (!login)
        return toast(`Please Login First →`, {
          action: {
            label: "Login",
            onClick: () => router.push("/auth/login"),
          },
        });

      if (!product) return;

      await dispatch(
        addItemToCart({
          productId: product._id,
          quantity: quantity < 1 ? 1 : quantity,
          price: product.price,
        })
      );
      dispatch(toggleSidebar(true));
    } catch (error) {
      console.log(error);
    }
  }

  async function handleWishlist() {
    try {
      if (!login)
        return toast(`Please Login First →`, {
          action: {
            label: "Login",
            onClick: () => router.push("/auth/login"),
          },
        });

      if (!product) return;

      await addToWishlist(product._id);
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
    if (!product?.category) return;
    const data: Product[] = await getProductsByCategory([product.category]);
    setRelatedProducts(data);
  }

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
      dispatch(fetchProducts());
    }
  }, [dispatch, productId]);

  useEffect(() => {
    if (product) {
      getRelatedProducts();
    }
  }, [product]);

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  if (!product) {
    return (
      <div className="container mx-auto py-10">
        <p className="text-center text-lg">Loading product...</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto py-5 mb-10 px-4">
      <p className="flex items-center gap-2 text-md text-[var(--para-primary)] sm:font-semi-bold tracking-tight mb-5">
        <Link href={`/products`} className="hover:text-black ">
          &larr; Products
        </Link>
        <i className="text-sm text-[var(--para-primary)]">
          <GoDotFill />
        </i>
        <span className="text-black">{product.name}</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 mb-16 md:mb-20">
        {/* Desktop Gallery */}
        <div className="hidden lg:grid sm:col-span-6 lg:col-span-7 grid-cols-1 lg:grid-cols-2 h-150 overflow-scroll no-scrollbar lg:h-auto gap-2 w-full justify-self-center">
          {product.images?.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={product.name}
              className="w-full h-100 border border-2 md:border-4 border-white cursor-pointer"
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="block col-span-6 lg:hidden mb-4">
          <Carousel
            plugins={[plugin.current]}
            className="w-full align-self-center mx-auto"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {product.images?.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="w-80 shadow-none md:p-0 mx-auto border-none rounded-none">
                    <CardContent className="flex items-center justify-center">
                      <img
                        src={image}
                        alt={product.name}
                        className="w-full h-100 cursor-pointer"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 hover:bg-teal-600 hover:text-white transition-all duration-200" />
            <CarouselNext className="right-0 hover:bg-teal-600 hover:text-white transition-all duration-200" />
          </Carousel>
        </div>

        {/* Product Details */}
        <div className="col-span-6 lg:col-span-5 w-full justify-self-start">
          <div className="border-b border-gray-300 mb-4 pb-2">
            <h3 className="font-cormorant text-xl font-bold tracking-wide">
              {product.name}
            </h3>
            <span className="inline-block text-lg text-[var(--para-primary)]">
              {product.category}
            </span>
          </div>
          <p className="text-xl mb-2 font-bold">
            <span className="text-gray-700 text-lg">MRP</span> &#8377;{" "}
            {product.price}
          </p>

          {/* Quantity */}
          <div className="flex mb-4">
            <div className="flex border border-gray-300 items-center justify-start">
              <button
                className="px-2 text-md cursor-pointer font-bold"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <p className="px-2 text-md border-r border-l border-gray-300">
                {quantity}
              </p>
              <button
                className="px-2 text-md cursor-pointer font-bold"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 mb-6 border-b border-gray-300 pb-4">
            <button
              onClick={handleAddtoCart}
              className="flex items-center gap-2 px-6 py-2 text-white border font-semibold bg-teal-500 cursor-pointer hover:bg-teal-600"
            >
              <CiShoppingCart size={20} />
              <span className="text-base">Add To Cart</span>
            </button>
            {wishlisted || product.wishlist ? (
              <button className="flex items-center gap-2 px-6 py-2 text-red-600 border border-red-600 font-semibold cursor-pointer">
                <CiHeart size={20} />
                <span className="text-base">Wishlisted</span>
              </button>
            ) : (
              <button
                onClick={handleWishlist}
                className="flex items-center gap-2 px-6 py-2 border font-semibold cursor-pointer hover:border-black hover:text-black"
              >
                <CiHeart size={20} />
                <span className="text-base">Wishlist</span>
              </button>
            )}
          </div>

          {/* Description */}
          <div className="w-full mb-6">
            <h4 className="text-md font-semibold mb-1 uppercase">
              Description
            </h4>
            <p className="text-[var(--para-primary)]">{product.description}</p>
          </div>

          {/* Features */}
          <div className="w-full mb-6">
            <h4 className="text-md font-semibold mb-2 uppercase">Features</h4>
            {product.features?.map((feature, index) => (
              <span
                key={index}
                className="inline-block text-[var(--para-primary)] border border-gray-300 px-6 py-2 text-sm mb-2 mr-2"
              >
                {feature}
              </span>
            ))}
          </div>

          {/* Shipping */}
          <div className="w-full">
            <h4 className="text-md font-semibold mb-2 uppercase">
              Shipping Details
            </h4>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <i className="p-4 bg-[#F7F7F7] rounded-full">
                  <FaCalendarAlt size={16} />
                </i>
                <div>
                  <h4 className="text-xs text-[var(--para-primary)]">
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
                    Package
                  </h4>
                  <p className="text-md">Regular Package</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      <h3 className="text-2xl md:text-4xl text-[var(--title-primary)] font-bold uppercase tracking-wider text-center mb-6 md:mb-20">
        You might also like this
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {relatedProducts.slice(0, 5).map((rp) => (
          <ProductCard product={rp} key={rp._id} width="" />
        ))}
      </div>
    </section>
  );
}
