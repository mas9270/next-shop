"use client";
import { useAppSelector } from "@/store/hooks";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartIcon() {
  return (
    <CustomBadge>
      <ShoppingCart />
    </CustomBadge>
  );
}

function CustomBadge({ children }: { children: React.ReactNode }) {
  const cart = useAppSelector((state) => state.cart.items);
  return (
    <div className="relative">
      <Link href="/orders">
        {children}
        {cart && cart?.length !== 0 && (
          <div
            className="absolute  bg-red-500 flex justify-center items-center text-sm"
            style={{
              top: -10,
              right: -10,
              borderRadius: "100%",
              width: "20px",
            }}
          >
            {cart.length}
          </div>
        )}
      </Link>
    </div>
  );
}
