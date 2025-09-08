"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useEffect, useState } from "react";
import { addAll } from "@/store/slices/cart";

export default function CartConfig() {
  const cart = useAppSelector((state) => state.cart.items);
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!firstTime) {
      localStorage.setItem("orders", JSON.stringify(cart));
    }
  }, [cart]);

  useEffect(() => {
    const cartLocal = localStorage.getItem("orders");
    const caartPars = cartLocal ? JSON.parse(cartLocal) : [];
    if (caartPars) {
      dispatch(addAll(caartPars));
    }
    setFirstTime(false);
  }, []);
  return null;
}
