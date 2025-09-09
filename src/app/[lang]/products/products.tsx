"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { addToCart } from "@/store/slices/cart";
import { products } from "@/constants/productsList";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductType } from "@/constants/productsList";
import { Loader2 } from "lucide-react";

export default function Products() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get("page");
  const itemsPerPage = 12;
  const { text } = useAppSelector((state) => state.search);
  const [productsFilter, setProductsFilter] = useState<{
    totalPages: number;
    currentProducts: ProductType[];
  }>({ totalPages: 0, currentProducts: [] });
  const [currentPage, setCurrentPage] = useState<number>(
    pageQuery ? Number(pageQuery) : 1
  );
  const [loading, setLoading] = useState<boolean>(false);

  // بروزرسانی URL و اسکرول
  useEffect(() => {
    router.replace(`?page=${currentPage}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, router]);

  // تولید صفحات قابل نمایش با نقاط چین
  const getVisiblePages = (currentPage: number, totalPages: number) => {
    const visible: (number | string)[] = [];

    if (totalPages <= 6)
      return Array.from({ length: totalPages }, (_, i) => i + 1);

    visible.push(1); // صفحه اول

    if (currentPage > 3) visible.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) visible.push(i);

    if (currentPage < totalPages - 2) visible.push("...");

    visible.push(totalPages); // صفحه آخر
    return visible;
  };

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      if (text) {
        const filterItem = products.filter((item) =>
          item.title.includes(text.trim())
        );
        const totalPages = Math.ceil(filterItem.length / itemsPerPage);
        const currentProducts = filterItem.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );

        setProductsFilter({ totalPages, currentProducts });
      } else {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        const currentProducts = products.slice(
          (currentPage - 1) * itemsPerPage,
          currentPage * itemsPerPage
        );
        setProductsFilter({ totalPages, currentProducts });
      }
      setCurrentPage(1);
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [text]);

  return (
    <div className="container mx-auto p-6 flex-1">
      {text && (
        <div className="w-full flex justify-center items-center">
          <h1 className="text-xl font-bold mb-6 text-center">
            مورد جستجو : <span className="text-sky-500">{text}</span>
          </h1>
        </div>
      )}

      {loading && (
        <div className="w-full flex-1 flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      )}

      {/* Grid محصولات */}
      {!loading && productsFilter.currentProducts.length === 0 ? (
        <div className="w-full flex justify-center">
          محصولی برای نمایش موجود نیست
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productsFilter.currentProducts.map((product, index) => {
            return (
              <Card key={index} className="flex flex-col">
                <CardHeader>
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <CardTitle className="mt-3">{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col justify-between flex-1">
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.description}
                  </p>
                  <p className="font-semibold text-primary mb-4">
                    {product.price.toLocaleString("fa-IR")} تومان
                  </p>
                  <div className="flex gap-2 mt-auto">
                    <Link href={`/products/${product.id}`} passHref>
                      <Button variant="outline" className="flex-1">
                        نمایش محصول
                      </Button>
                    </Link>
                    <Button
                      className="flex-1"
                      onClick={() => {
                        dispatch(addToCart(product));
                      }}
                    >
                      افزودن به سبد
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {!loading && productsFilter.currentProducts.length !== 0 && (
        <div className="mt-10 flex justify-center" dir="rtl">
          <Pagination>
            <PaginationContent className="flex justify-center gap-2">
              {/* Previous */}
              <PaginationItem>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  قبلی
                </Button>
              </PaginationItem>

              {/* Page numbers */}
              {getVisiblePages(currentPage, productsFilter.totalPages).map(
                (page, idx) =>
                  page === "..." ? (
                    <span key={idx} className="px-3 py-2 text-muted-foreground">
                      ...
                    </span>
                  ) : (
                    <PaginationItem key={idx}>
                      <PaginationLink
                        isActive={page === currentPage}
                        onClick={() => setCurrentPage(Number(page))}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
              )}

              {/* Next */}
              <PaginationItem>
                <Button
                  variant="outline"
                  onClick={() =>
                    setCurrentPage((p) =>
                      Math.min(p + 1, productsFilter.totalPages)
                    )
                  }
                  disabled={currentPage === productsFilter.totalPages}
                >
                  بعدی
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
