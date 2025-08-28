import Link from "next/link";

export default function Hero() {
  return (
    <section className="pb-5 md:pb-10">
      {/* <div className="h-[500px] overflow-hidden bg-[url('/set-gift-boxes-toy-hearts.jpg')] bg-cover bg-center"></div> */}
      <div className="relative px-2  bg-[linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.7)),url('/Images/hero_image.webp')] bg-cover bg-no-repeat bg-center  bg-[#f7f7f7]  h-[500px]  flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-10">
            High-quality gift hamper&apos;s and gift boxes
          </h1>
          <p className="md:w-1/2 mx-auto md:px-20 mb-10 text-white  text-xl">
            From timeless treasures to little surprises, we bring you gifts that
            speak from the heart. Beautifully wrapped with ribbons that make
            every moment unforgettable.
          </p>
          <div className="flex justify-center">
            <Link
              href={"/products"}
              className="border border-white bg-white text-black px-8 py-3 font-semibold text-md md:hover:text-white md:hover:bg-black transition duration-300 tracking-wide"
            >
              <p>EXPLORE PRODUCTS</p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
