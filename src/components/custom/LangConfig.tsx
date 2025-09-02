"use client";
import React, { useEffect } from "react";
import { setLang } from "@/store/slices/lang";
import { useAppDispatch } from "@/store/hooks";
import { getDictionary } from "@/lib/dictionaries";

export default function LangConfig(props: { lang: "fa" | "en" }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getLang() {
      const dict = await getDictionary(props.lang);
      dispatch(setLang({ lang: props.lang, dictionary: dict }));
    }

    getLang();
  }, [props.lang]);

  return <></>;
}
