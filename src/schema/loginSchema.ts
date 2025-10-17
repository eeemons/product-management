import z from "zod";

// ✅ Define Zod schema for validation
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
