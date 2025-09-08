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

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
};

const products: Product[] = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  title: `محصول ${i + 1}`,
  description: "این یک توضیح کوتاه برای محصول است تا کاربر با آن آشنا شود.",
  image: `https://picsum.photos/seed/${i + 1}/300/200`,
  price: (i + 1) * 100000,
}));

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get("page");
  const itemsPerPage = 12;

  const [currentPage, setCurrentPage] = useState<number>(
    pageQuery ? Number(pageQuery) : 1
  );

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // بروزرسانی URL و اسکرول
  useEffect(() => {
    router.replace(`?page=${currentPage}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage, router]);

  // تولید صفحات قابل نمایش با نقاط چین
  const getVisiblePages = (currentPage: number, totalPages: number) => {
    const visible: (number | string)[] = [];

    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);

    visible.push(1); // صفحه اول

    if (currentPage > 3) visible.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) visible.push(i);

    if (currentPage < totalPages - 2) visible.push("...");

    visible.push(totalPages); // صفحه آخر
    return visible;
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">محصولات فروشگاه</h1>

      {/* Grid محصولات */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {currentProducts.map((product) => (
          <Card key={product.id} className="flex flex-col">
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
              <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
              <p className="font-semibold text-primary mb-4">
                {product.price.toLocaleString("fa-IR")} تومان
              </p>
              <div className="flex gap-2 mt-auto">
                <Link href={`/products/${product.id}`} passHref>
                  <Button variant="outline" className="flex-1">
                    نمایش محصول
                  </Button>
                </Link>
                <Button className="flex-1">افزودن به سبد</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
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
            {getVisiblePages(currentPage, totalPages).map((page, idx) =>
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
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                بعدی
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
