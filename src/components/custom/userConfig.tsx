"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import { useAppSelector } from "@/store/hooks";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import CustomModal from "./customModal";
import { usePathname, useRouter } from "next/navigation";
import UserInfoHeader from "./userInfoHeader";

export default function UserConfig(props: { lang: "fa" | "en" }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [tokenInfo, setTokenInfo] = useState<Record<string, unknown> | null>(
    null
  );
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const path = usePathname();

  useEffect(() => {
    if (firstTime) {
      setLoading(true);
    }
    fetch("/api/auth/cookie")
      .then((res) => res.json())
      .then((res) => {
        setFirstTime(false);
        if (res.success) {
          setTokenInfo(res.data);
        } else {
          setTokenInfo(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        setTokenInfo(null);
        setLoading(false);
      });
  }, [path]);

  return (
    <div>
      {loading ? (
        <Loader2 className="animate-spin" />
      ) : (
        <>
          {tokenInfo ? (
            <UserInfoHeader tokenInfo={tokenInfo}/>
          ) : (
            <UserController tokenInfo={tokenInfo} loading={loading} />
          )}
        </>
      )}
    </div>
  );
}

function UserController(props: {
  tokenInfo: unknown | null;
  loading: boolean;
}) {
  const { tokenInfo, loading } = props;
  const router = useRouter();
  const [signIn, setSignIn] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const dictionary = useAppSelector((state) => state.lang.dictionary);
  const lang = useAppSelector((state) => state.lang.lang);

  useEffect(() => {
    if (!open) {
      setSignIn(true);
    }
  }, [open]);

  return (
    <div className={`${!tokenInfo ? "" : "hidden"} flex content-center gap-1`}>
      <Button
        className="cursor-pointer bg-sky-400 hover:bg-sky-300"
        title={`${dictionary?.login} / ${dictionary?.register}`}
        size={"sm"}
        onClick={() => {
          setOpen(true);
        }}
      >
        <div className="flex gap-1">
          <UserPlus />
          <span>/</span>
          <LogIn />
        </div>
      </Button>
      <CustomModal
        loading={loading}
        width="500px"
        title={signIn ? dictionary?.loginForm : dictionary?.registerForm}
        open={open}
        onClose={() => {
          setOpen(false);
          router.push("/");
        }}
      >
        {open ? (
          signIn ? (
            <LoginForm
              onDone={() => {
                // router.push(`/${lang}`);
                setOpen(false);
                window.location.reload();
              }}
              goToSingUp={() => {
                setSignIn(false);
              }}
            />
          ) : (
            <RegisterForm
              onDone={() => {
                setSignIn(true);
              }}
              goToSingIn={() => {
                setSignIn(true);
              }}
            />
          )
        ) : null}
      </CustomModal>
    </div>
  );
}
