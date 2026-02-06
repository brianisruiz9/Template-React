import * as React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/diseno-de-logo.png";
import { useAppSelector } from "../store/hooks";
import { useTranslation } from "react-i18next";

export type SidebarKey = "dashboard" | "user" | "posts" | "signin" | "notfound";

type SidebarItem = {
  key: SidebarKey;
  label: string;
  icon: React.ReactNode;
  path: string;
};

type SidebarProps = {
  onItemClick?: () => void;
};

export default function Sidebar({ onItemClick }: SidebarProps) {
  const mode = useAppSelector((s) => s.ui.mode);
  const { t } = useTranslation();

  const items: SidebarItem[] = [
    {
      key: "dashboard",
      label: t("menu.dashboard"),
      icon: <Icon icon="solar:graph-up-bold-duotone" height={24} width={24} />,
      path: "/dashboard",
    },
    {
      key: "user",
      label: t("menu.users"),
      icon: (
        <Icon icon="solar:user-circle-bold-duotone" height={24} width={24} />
      ),
      path: "/users",
    },
    {
      key: "posts",
      label: t("menu.posts"),
      icon: (
        <Icon icon="solar:document-text-bold-duotone" height={24} width={24} />
      ),
      path: "/posts",
    },
    {
      key: "signin",
      label: t("menu.sign_in"),
      icon: <Icon icon="solar:login-3-bold-duotone" height={24} width={24} />,
      path: "/sign-in",
    },
    {
      key: "notfound",
      label: t("menu.not_found"),
      icon: (
        <Icon
          icon="solar:tuning-square-2-bold-duotone"
          height={24}
          width={24}
        />
      ),
      path: "/not-found",
    },
  ];

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        px: 2,
        py: 2.5,
      }}
    >
      {/* Logo */}
      <Box sx={{ px: 1, mb: 2 }}>
        <Box
          component="img"
          src={Logo}
          alt="Logo"
          sx={{ height: 45, width: "auto" }}
        />
      </Box>

      {/* Menu */}
      <List sx={{ px: 0 }}>
        {items.map((it) => {
          return (
            <ListItemButton
              key={it.key}
              component={NavLink}
              to={it.path}
              onClick={() => {
                onItemClick?.();
              }}
              sx={{
                borderRadius: 2,
                mb: 0.75,
                py: 1.2,
                px: 1.25,
                "&.active": {
                  color: "#1677ff",
                  bgcolor: "rgba(22, 119, 255, 0.10)",
                  "& .MuiListItemIcon-root": {
                    color: "#1677ff",
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{it.icon}</ListItemIcon>

              <ListItemText
                primary={
                  <Typography
                    sx={{
                      fontSize: 15,
                      color: mode === "light" ? "#637385" : "#FFFFFF",
                    }}
                  >
                    {it.label}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
