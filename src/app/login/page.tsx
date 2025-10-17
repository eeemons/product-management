"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import Button from "@/components/Button";
import { useLoginMutation } from "@/lib/features/auth/authSlice";
import { RootState } from "@/lib/store";
import InputField from "@/components/InputField";
import { LoginFormData, loginSchema } from "@/schema/loginSchema";

const LoginPage = () => {
  const [login, { isLoading }] = useLoginMutation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login({ email: data.email }).unwrap();
      toast.success("Login successful!");
    } catch (err: any) {
      const errorMessage =
        err.data?.message || "Failed to login. Please try again.";
      toast.error(errorMessage);
      console.error("Failed to login: ", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-900">Login</h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label="Email"
            type="email"
            placeholder="Enter your email"
            register={register("email")}
            error={errors.email}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
