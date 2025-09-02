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
import { useAppSelector } from "@/store/hooks";

export default function UserInfoHeader(props: {
  tokenInfo: Record<string, unknown> | null;
}) {
  const { tokenInfo } = props;
  const lang = useAppSelector((state) => state.lang.lang);
  const router = useRouter();

  function exit() {
    fetch("/api/auth/logout", {
      method: "POST",
      body: JSON.stringify({}),
    }).then(() => {
      window.location.reload();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>
            <>{tokenInfo ? tokenInfo?.username : ""}</>
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <>{tokenInfo ? tokenInfo?.email : ""}</>
        </DropdownMenuItem>

        {tokenInfo?.role === "ADMIN" && (
          <DropdownMenuItem
            onClick={(e) => {
              router.push(`/${lang}/dashboard`);
            }}
          >
            پنل مدیریت
          </DropdownMenuItem>
        )}

        {tokenInfo?.role ? (
          <DropdownMenuItem
            onClick={(e) => {
              router.push(`/${lang}/profile`);
            }}
          >
            پروفایل
          </DropdownMenuItem>
        ) : null}

        <DropdownMenuItem
          onClick={() => {
            exit();
          }}
        >
          خروج
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
