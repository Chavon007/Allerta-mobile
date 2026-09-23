import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password is required"),
});

export const SignupSchema = z.object({
  fullName: z.string().min(5, "Full name must be at least 5 characters"),
  email: z.string().email("Invalid email address"),
  username: z.string().min(3, "Username must be at least three characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
});
export type LoginDTO = z.infer<typeof LoginSchema>;
export type SignupDTO = z.infer<typeof SignupSchema>;
