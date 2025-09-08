"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { products } from "@/constants/productsList";

const categories = [
  { id: 1, name: "پرفروش‌ ترین‌ها" },
  { id: 2, name: "محصولات جدید" },
  { id: 3, name: "تخفیف ویژه" },
];

export default function HomePage() {
  return (
    <div className="space-y-16 px-4 md:px-8">
      {/* بنر اصلی */}
      <section className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg">
        <Image
          src="https://picsum.photos/1200/500?blur=2"
          alt="بنر اصلی"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            بهترین محصولات فروشگاهی
          </h1>
          <p className="text-white/90 mb-6 max-w-2xl drop-shadow">
            انتخاب‌های ویژه ما از پرفروش‌ترین و محبوب‌ترین محصولات با کیفیت عالی
          </p>
          <Link href="/products">
            <Button size="lg">مشاهده همه محصولات</Button>
          </Link>
        </div>
      </section>

      {/* Carousel محصولات ویژه */}
      <section className="w-full flex flex-col">
        <h2 className="text-2xl font-bold mb-6">محصولات ویژه</h2>
        {/* Carousel محصولات ویژه */}
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper w-full"
        >
          {products
            .filter((filterItem) => [1, 2, 3, 4, 5].includes(filterItem.id))
            .map((product) => (
              <SwiperSlide key={product.id}>
                <div className="px-4">
                  <Link href={`/products/${product.id}`}>
                    <Card className="cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
                      <CardHeader className="overflow-hidden rounded-t-2xl">
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover transition-transform duration-300 hover:scale-105 rounded-2xl"
                          />
                        </div>
                        <CardTitle className="mt-3 text-base md:text-lg font-semibold">
                          {product.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-2">
                        <p className="text-sm text-muted-foreground mb-2">
                          {product.description}
                        </p>
                        <p className="font-semibold text-primary">
                          {product.price.toLocaleString("fa-IR")} تومان
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </section>

      {/* دسته‌بندی‌ها با اسکرول افقی */}
      {categories.map((category) => (
        <section key={category.id}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">{category.name}</h3>
            <Link href="/products">
              <Button variant="outline" size="sm">
                مشاهده همه
              </Button>
            </Link>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {products.slice(0, 10).map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="flex-shrink-0 w-64"
              >
                <Card className="cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300 rounded-2xl">
                  <CardHeader className="overflow-hidden rounded-t-2xl">
                    <div className="relative w-full h-40 rounded-2xl overflow-hidden">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105 rounded-2xl"
                      />
                    </div>
                    <CardTitle className="mt-3 text-base font-semibold">
                      {product.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="font-semibold text-primary">
                      {product.price.toLocaleString("fa-IR")} تومان
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
