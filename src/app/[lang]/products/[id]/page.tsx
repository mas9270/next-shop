import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

import { products } from "@/constants/productsList";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return <p className="text-center mt-10">محصول یافت نشد</p>;
  }

  return (
    <div className="container max-w-5xl mx-auto py-10 px-4">
      <Card className="overflow-hidden shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* تصویر محصول */}
          <div className="relative w-full h-80 md:h-full rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              quality={100}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* اطلاعات محصول */}
          <CardContent className="flex flex-col justify-center space-y-6">
            <CardHeader className="p-0">
              <CardTitle className="text-2xl font-bold">
                {product.title}
              </CardTitle>
            </CardHeader>

            <p className="text-lg text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* نمایش قیمت به تومان */}
            <div className="text-xl font-semibold text-primary">
              {product.price.toLocaleString("fa-IR")} تومان
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1">افزودن به سبد خرید</Button>
              <Link href="/products" className="flex-1">
                <Button variant="outline" className="w-full">
                  بازگشت به محصولات
                </Button>
              </Link>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
