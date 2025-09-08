import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import RegisterForm from "./registerForm";
import LoginForm from "./loginForm";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { LogIn, UserPlus } from "lucide-react";
import CustomModal from "./customModal";
import { useRouter } from "next/navigation";
import { checkToken } from "@/store/slices/userInfo";

export default function LoginLogout() {
  const router = useRouter();
  const [signIn, setSignIn] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const { dictionary } = useAppSelector((state) => state.lang);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!open) {
      setSignIn(true);
    }
  }, [open]);

  return (
    <div className={`flex content-center gap-1`}>
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
        loading={false}
        width="500px"
        title={signIn ? dictionary?.loginForm : dictionary?.registerForm}
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {open ? (
          signIn ? (
            <LoginForm
              onDone={() => {
                setOpen(false);
                // window.location.reload();
                dispatch(checkToken());
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
