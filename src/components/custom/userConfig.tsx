"use client";

import { useAppSelector } from "@/store/hooks";
import UserInfoHeader from "./userInfoHeader";
import LoginLogout from "./loginLogout";

export default function UserConfig() {
  const { data, loading } = useAppSelector((state) => state.userInfo);
  console.log(data,loading);
  return <div>{data ? <UserInfoHeader /> : <LoginLogout />}</div>;
}
