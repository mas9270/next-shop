"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "@/store/slices/cart";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">سبد خرید شما خالی است</h2>
        <p className="text-muted-foreground">محصولی برای نمایش وجود ندارد.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-8">
      <h1 className="text-3xl font-bold">سفارشات شما</h1>

      <div className="flex flex-col space-y-4">
        {cartItems.map((item) => (
          <Card
            key={item.id}
            className="flex flex-col md:flex-row items-center gap-4 p-4"
          >
            <div className="relative w-full md:w-48 h-40 flex-shrink-0 rounded-2xl overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            <CardContent className="flex-1 flex flex-col justify-between w-full">
              <CardHeader className="p-0">
                <CardTitle className="text-lg md:text-xl">
                  {item.title}
                </CardTitle>
              </CardHeader>

              <p className="text-muted-foreground mt-1">
                قیمت: {item.price.toLocaleString("fa-IR")} تومان
              </p>

              <div className="flex items-center gap-2 mt-3">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                >
                  -
                </Button>
                <span className="px-2">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => dispatch(increaseQuantity(item.id))}
                >
                  +
                </Button>

                <Button
                  size="sm"
                  variant="destructive"
                  className="ml-auto"
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <h2 className="text-xl font-bold">
          جمع کل: {totalPrice.toLocaleString("fa-IR")} تومان
        </h2>
        <Button size="lg" variant="default">
          پرداخت
        </Button>
      </div>
    </div>
  );
}
