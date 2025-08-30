"use client";
import ProductCard from "../../components/cards/productCard";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "apps/frontend/src/redux/hook";
import {
  fetchProducts,
  fetchProductsByCategory,
  getProductsBySearching,
  Product,
} from "apps/frontend/src/redux/productSlice";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import { Checkbox } from "../../components/ui/checkbox";
// import { useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";
import { ProductCardSkeleton } from "../../components/cards/ProductCardSkeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "apps/frontend/src/components/ui/pagination";
const categories = [
  "Rakhi Hamper",
  "Birthday",
  "Gift Box",
  "Bouquet",
  "Rakhi Gift Box",
];

export default function Products() {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const initialCategories = searchParams.get("q")
    ? searchParams.get("q")?.split(",")
    : [];
  const [search, setSearch] = useState(initialQuery);
  const [debouncedSearch] = useDebounce(search, 800);
  const [selected, setSelected] = useState(
    categories.map((name) => ({
      name,
      checked: initialCategories?.includes(name) || false,
    }))
  );

  const handleSelect = (option: string) => {
    setCurrentPage(1);
    setSearch("");
    const newSelected = selected.map((item) =>
      item.name === option ? { ...item, checked: !item.checked } : item
    );
    setSelected(newSelected);

    const activeCategories = newSelected
      .filter((item) => item.checked)
      .map((item) => item.name);

    const params = new URLSearchParams(searchParams);
    if (activeCategories.length > 0) {
      params.set("q", activeCategories.join(","));
      params.delete("query"); // Clear search query when a category is selected
    } else {
      params.delete("q");
    }
    router.replace(`${pathName}?${params.toString()}`);
  };

  const handleSearch = (term: string) => {
    // Clear categories when a search is performed
    setSelected(categories.map((name) => ({ name, checked: false })));
    setSearch(term);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch.trim()) {
      params.set("query", debouncedSearch.trim());
      params.delete("q");
    } else {
      params.delete("query");
    }
    router.replace(`${pathName}?${params.toString()}`);
  }, [debouncedSearch, router, pathName]);

  useEffect(() => {
    // This useEffect will run when `pathname` or `searchParams` changes.
    if (initialCategories && initialCategories?.length > 0)
      router.replace(`${pathName}?q=${initialCategories?.join(",")}`);

    const categoryParams = searchParams.get("q")?.split(",");

    setLoading(true);

    if (debouncedSearch.trim()) {
      dispatch(getProductsBySearching(debouncedSearch)).finally(() => {
        setLoading(false);
      });
    } else if (categoryParams && categoryParams.length > 0) {
      dispatch(fetchProductsByCategory(categoryParams)).finally(() => {
        setLoading(false);
      });
    } else {
      dispatch(fetchProducts()).finally(() => {
        setLoading(false);
      });
    }
  }, [searchParams, dispatch]); // Depend on searchParams

  return (
    <section className="py-5 mb-50">
      <h3 className="hidden md:flex items-center gap-2 text-sm text-[var(--para-primary)] sm:font-semi-bold tracking-tight mb-6 ml-4">
        <Link href={`/`} className="hover:text-black ">
          &larr; Home
        </Link>
        <GoDotFill className="text-sm text-[var(--para-primary)]" />
        <p className="text-black">Products</p>
      </h3>
      {/* main container */}
      {/* filters */}
      <div className="w-full block  md:hidden mb-4">
        <div className="flex gap-4 items-center mb-4">
          <h2 className="text-md px-4 font-bold tracking-wider">FILTERS</h2>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full mr-5 focus:outline-none border-b p-2 py-2"
            value={search}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />
        </div>
        <ul className="px-4 w-full flex gap-4 overflow-x-scroll no-scrollbar">
          {selected.map((option, index) => (
            <div
              key={index}
              className="flex items-center shrink-0 gap-2 py-1 text-gray-700 cursor-pointer"
            >
              <Checkbox
                checked={option.checked}
                onCheckedChange={() => handleSelect(option.name)}
              />
              <li key={option.name} onClick={() => handleSelect(option.name)}>
                {option.name}
              </li>
            </div>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-6  md:border-t">
        {/* main filter container*/}
        <div className="hidden md:block col-span-2 lg:col-span-1 md:p-5 border-r">
          <h2 className="text-md font-bold tracking-wider mb-2">FILTERS</h2>
          <input
            type="text"
            placeholder="Search products..."
            className="w-full focus:outline-none border-b py-2 mb-4"
            value={search}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
          />

          <h2 className="text-md font-bold tracking-wider mb-2">CATEGORIES</h2>
          <ul className="hidden md:block w-full flex gap-4">
            {selected.map((option, index) => (
              <div
                key={index}
                className="flex items-center gap-2 py-1 text-gray-700 cursor-pointer"
              >
                <Checkbox
                  checked={option.checked}
                  onCheckedChange={() => handleSelect(option.name)}
                />
                <li key={option.name} onClick={() => handleSelect(option.name)}>
                  {option.name}
                </li>
              </div>
            ))}
          </ul>
        </div>

        <div className="col-span-6 md:col-span-4 lg:col-span-5 sm:p-5">
          <div className="grid grid-cols-2 gap-0 px-5 md:col-span-5 sm:grid-cols-2 gap-5 lg:grid-cols-3 lg:grid-cols-5 lg:gap-7 mb-6 md:mb-10">
            {loading ? (
              <>
                <ProductCardSkeleton width="w-full" />
                <ProductCardSkeleton width="w-full" />
                <ProductCardSkeleton width="w-full" />
              </>
            ) : products && products.length > 0 ? (
              (products || [])
                ?.map((product: Product) => (
                  <ProductCard product={product} key={product._id} width="" />
                ))
                .slice((currentPage - 1) * 10, currentPage * 10)
            ) : (
              <div className="col-span-6 h-200 flex flex-col items-center">
                <h2 className="text-center font-bold text-2xl mt-20 mb-4 text-teal-600">
                  No Items Found
                </h2>
                <p className="mb-5 text-center text-gray-500 text-xl">
                  Try to search for other products
                </p>
              </div>
            )}
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>

              <PaginationItem>
                <PaginationLink href="#">
                  {currentPage} - {Math.ceil(products?.length / 10)}
                </PaginationLink>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, Math.ceil(products.length / 10))
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
}
