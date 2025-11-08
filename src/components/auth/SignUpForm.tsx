import { useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { useDispatch } from "react-redux";
import { signup } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email address").max(255),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password too long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const validation = signUpSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    if (!validation.success) {
      setError(validation.error.errors[0].message);
      setLoading(false);
      return;
    }

    try {
      dispatch(signup({ name, email, password }));
      const currentUser = localStorage.getItem("currentUser");

      if (currentUser) {
        toast({
          title: "Welcome!",
          description: "Your account has been created successfully.",
        });
        navigate("/songs");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSignUp}>
      {error && (
        <Alert severity="error" sx={{ marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "hsl(240 6% 18%)",
            "& fieldset": { borderColor: "hsl(240 6% 20%)" },
            "&:hover fieldset": { borderColor: "hsl(271 91% 65%)" },
            "&.Mui-focused fieldset": { borderColor: "hsl(271 91% 65%)" },
          },
          "& .MuiInputLabel-root": { color: "hsl(0 0% 70%)" },
          "& .MuiInputBase-input": { color: "hsl(0 0% 98%)" },
        }}
      />

      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "hsl(240 6% 18%)",
            "& fieldset": { borderColor: "hsl(240 6% 20%)" },
            "&:hover fieldset": { borderColor: "hsl(271 91% 65%)" },
            "&.Mui-focused fieldset": { borderColor: "hsl(271 91% 65%)" },
          },
          "& .MuiInputLabel-root": { color: "hsl(0 0% 70%)" },
          "& .MuiInputBase-input": { color: "hsl(0 0% 98%)" },
        }}
      />

      <TextField
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        sx={{
          marginBottom: 2,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "hsl(240 6% 18%)",
            "& fieldset": { borderColor: "hsl(240 6% 20%)" },
            "&:hover fieldset": { borderColor: "hsl(271 91% 65%)" },
            "&.Mui-focused fieldset": { borderColor: "hsl(271 91% 65%)" },
          },
          "& .MuiInputLabel-root": { color: "hsl(0 0% 70%)" },
          "& .MuiInputBase-input": { color: "hsl(0 0% 98%)" },
        }}
      />

      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
        sx={{
          marginBottom: 3,
          "& .MuiOutlinedInput-root": {
            backgroundColor: "hsl(240 6% 18%)",
            "& fieldset": { borderColor: "hsl(240 6% 20%)" },
            "&:hover fieldset": { borderColor: "hsl(271 91% 65%)" },
            "&.Mui-focused fieldset": { borderColor: "hsl(271 91% 65%)" },
          },
          "& .MuiInputLabel-root": { color: "hsl(0 0% 70%)" },
          "& .MuiInputBase-input": { color: "hsl(0 0% 98%)" },
        }}
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{
          background: "var(--gradient-primary)",
          color: "white",
          padding: "12px",
          fontSize: "16px",
          fontWeight: 600,
          textTransform: "none",
          borderRadius: "12px",
          boxShadow: "var(--glow-primary)",
          "&:hover": {
            background: "var(--gradient-primary)",
            boxShadow:
              "var(--glow-primary), 0 4px 12px hsl(271 91% 65% / 0.4)",
            transform: "translateY(-2px)",
          },
          transition: "all 0.3s ease",
        }}
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </Button>
    </Box>
  );
};

export default SignUpForm;
