import React, { useState } from "react";
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Logo from "../assets/images/diseno-de-logo.png";

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        background:
          "linear-gradient(90deg, #eef2f5 0%, #eef2f5 55%, #f3e6e0 100%)",
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          position: "fixed",
          top: 24,
          left: 24,
          zIndex: 10,
        }}
      >
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{
            height: 50,
            cursor: "pointer",
          }}
        />
      </Box>

      <Paper
        elevation={0}
        sx={{
          width: "min(460px, 100%)",
          borderRadius: 4,
          p: { xs: 3, sm: 5 },
          boxShadow: "0 18px 60px rgba(0,0,0,.10)",
          bgcolor: "white",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.25 }}
        >
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Sign in
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              Don&apos;t have an account?{" "}
              <Link href="#" underline="none" sx={{ fontWeight: 700 }}>
                Get started
              </Link>
            </Typography>
          </Box>

          {/* FORM */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              flexDirection: "column",
            }}
          >
            <TextField
              fullWidth
              name="email"
              label="Email address"
              value={form.email}
              onChange={handleInput}
              sx={{ mb: 3 }}
            />

            <Link
              variant="body2"
              color="inherit"
              underline="none"
              sx={{ mb: 1.5 }}
            >
              Forgot password?
            </Link>

            <TextField
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={handleInput}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        <Icon
                          icon={
                            showPassword
                              ? "solar:eye-bold"
                              : "solar:eye-closed-bold"
                          }
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              sx={{ mb: 3 }}
            />

            <Button fullWidth size="large" type="submit" variant="contained">
              Sign in
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signin;
