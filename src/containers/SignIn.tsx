import React, { useState, useEffect } from "react";
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
import type { AuthUser } from "../types/user";
import Logo from "../assets/images/diseno-de-logo.png";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginSuccess } from "../store/auth/authSlice";
import { useTranslation } from "react-i18next";

const Signin = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const mode = useAppSelector((s) => s.ui.mode);

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (form.email === "admin@email.com" && form.password === "123") {
        const user: AuthUser = {
          id: 1,
          name: "Admin",
          email: form.email,
          role: 1,
          permissions: [1, 2, 3, 4, 5],
        };
        const dataLogin = { token: "token-admin-123", user };
        dispatch(loginSuccess(dataLogin));
        navigate("/dashboard");
      } else {
        alert("Invalid credentials. Try");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        px: 2,
        background: "background.default",
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
          bgcolor: mode === "light" ? "#FFFFFF" : "#1B1E20",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2.25 }}
        >
          <Box sx={{ textAlign: "center", mb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {t("signin.sign_in")}
            </Typography>

            <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
              {t("signin.no_account")}{" "}
              <Link href="#" underline="none" sx={{ fontWeight: 700 }}>
                {t("signin.signup")}
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
              label={t("signin.email")}
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
              {t("signin.forget_pass")}
            </Link>

            <TextField
              fullWidth
              name="password"
              label={t("signin.password")}
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
              {t("signin.sign_in")}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signin;
