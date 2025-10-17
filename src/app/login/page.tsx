"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useLoginMutation } from "@/lib/features/auth/authSlice";
import { RootState } from "@/lib/store";
import { LoginFormData, loginSchema } from "@/schema/loginSchema";
import { MdEmail } from "react-icons/md";

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 space-y-6 border border-gray-100"
      >
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl font-semibold text-center text-gray-800"
        >
          Welcome Back
        </motion.h1>

        <p className="text-center text-gray-500 text-sm mb-2">
          Please sign in to continue
        </p>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register("email")}
              error={errors.email}
              icon={<MdEmail />}
            />
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </motion.div>
        </form>

        <p className="text-center text-gray-500 text-sm">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-medium hover:underline transition-colors"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
