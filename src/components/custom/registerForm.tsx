"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { reactToastify } from "@/utils/toastify";

export default function RegisterForm(props: {
  onDone?: (value: boolean) => void;
  goToSingIn: () => void;
}) {
  const { onDone, goToSingIn } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const dictionary = useAppSelector((state) => state.lang.dictionary);

  const formSchema = z.object({
    username: z
      .string()
      .min(3, { message: dictionary?.usernameNotValid })
      .max(20, { message: dictionary?.usernameNotValid }),
    email: z.string().email({ message: dictionary?.emailNotValid }),
    password: z.string().min(6, { message: dictionary?.passwordNotValid }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // setLoading(true);
    setLoading(true);
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((res) => {
         
        if (!res.success) {
          reactToastify({
            type: "warning",
            message: res?.message,
          });
        } else {
          reactToastify({
            type: "success",
            message: res?.message,
          });
          if (onDone) {
            onDone(true);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        reactToastify({
          type: "warning",
          message: error?.message
            ? error?.message
            : "خطایی رخ داده است دوباره تلاش کنید یا به مدیر سیستم اطلاع دهید",
        });
        setLoading(false);
      });
  }

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary?.username}</FormLabel>
                <FormControl>
                  <Input placeholder="ali123" {...field} />
                </FormControl>
                {/* <FormDescription>
                    این نام برای نمایش عمومی شما استفاده خواهد شد.
                  </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary?.email}</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{dictionary?.password}</FormLabel>
                <FormControl>
                  <Input placeholder="******" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer bg-sky-400 hover:bg-sky-300"
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              dictionary?.register
            )}
          </Button>
        </form>
      </Form>
      <div
        className="w-full py-2 mt-2 flex justify-center cursor-pointer text-sky-400 hover:text-sky-300"
        onClick={() => {
          if (!loading) {
            goToSingIn();
          }
        }}
      >
        {loading ? <Loader2 className="animate-spin" /> : dictionary?.login}
      </div>
    </div>
  );
}
