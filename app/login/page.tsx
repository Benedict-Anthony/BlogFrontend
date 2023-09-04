"use client";
import Button from "@/components/Button";
import React from "react";
import { useForm } from "react-hook-form";
import { AxiosInstance } from "@/utils/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type FormProps = {
  email: string;
  password: string;
};
const LoginPage = () => {
  const { register, handleSubmit } = useForm<FormProps>();
  const router = useRouter();
  const loginUser = async (data: FormProps) => {
    const response = await AxiosInstance.post("token/", {
      ...data,
    });
    if (response.statusText !== "OK") {
      alert("email or password incorrect");
      return;
    }
    localStorage.setItem("token", JSON.stringify(response.data));
    window.location.href = "/admin";
  };

  const onSubmit = async (data: FormProps) => {
    toast.promise(loginUser(data), {
      pending: "Please wait while we log you in",
      success: "Login in... Redirecting to dashboard",
      error: "email or password incorrect",
    });
  };
  return (
    <section className="w-full h-[20rem] flex justify-center items-center flex-col">
      <h2 className="text-left text-xl py-3">Login to continue</h2>
      <form
        className="w-[20rem] bg-blue-300 p-2 space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="w-full">
          <label htmlFor="email" className="py-2 text-sm">
            Email
          </label>

          <input
            type="email"
            className="input input-bordered w-full max-w-xs"
            {...register("email")}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password" className="py-2 text-sm">
            Password
          </label>

          <input
            type="password"
            className="input input-bordered w-full max-w-xs"
            {...register("password")}
          />
        </div>
        <Button type="submit" title="Login" />
      </form>
    </section>
  );
};

export default LoginPage;
