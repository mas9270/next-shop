"use client";

import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { checkToken } from "@/store/slices/userInfo";

export default function UserInfoHeader() {
  const { data } = useAppSelector((state) => state.userInfo);
  const { locale, dictionary } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function exit() {
    fetch("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(() => {
      dispatch(checkToken());
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>
            <>{data ? data?.username : ""}</>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <>{data ? data?.email : ""}</>
        </DropdownMenuItem>

        {data?.role === "ADMIN" && (
          <DropdownMenuItem
            onClick={(e) => {
              router.push(`/${locale}/dashboard`);
            }}
          >
            {dictionary.adminPanel}
          </DropdownMenuItem>
        )}

        {data?.role ? (
          <DropdownMenuItem
            onClick={(e) => {
              router.push(`/${locale}/profile`);
            }}
          >
            {dictionary.profile}
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuItem
          onClick={() => {
            exit();
          }}
        >
          {dictionary.logout}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
