import * as React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Badge,
  Typography,
} from "@mui/material";
import { Icon } from "@iconify/react";
import Logo from "../assets/images/diseno-de-logo.png";

export type SidebarKey =
  | "dashboard"
  | "user"
  | "product"
  | "blog"
  | "signin"
  | "notfound";

type SidebarItem = {
  key: SidebarKey;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  disabled?: boolean;
};

const items: SidebarItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <Icon icon="solar:graph-up-bold" height={24} width={24} />,
  },
  {
    key: "user",
    label: "User",
    icon: <Icon icon="solar:user-circle-bold" height={24} width={24} />,
  },
  {
    key: "product",
    label: "Product",
    icon: <Icon icon="solar:cart-large-2-bold" height={24} width={24} />,
  },
  {
    key: "blog",
    label: "Blog",
    icon: <Icon icon="solar:document-text-bold" height={24} width={24} />,
  },
  {
    key: "signin",
    label: "Sign in",
    icon: <Icon icon="solar:login-3-bold" height={24} width={24} />,
  },
  {
    key: "notfound",
    label: "Not found",
    icon: <Icon icon="solar:tuning-square-2-bold" height={24} width={24} />,
    disabled: false,
  },
];

type SidebarProps = {
  active?: SidebarKey;
  onChange?: (key: SidebarKey) => void;
  onItemClick?: () => void;
};

export default function Sidebar({
  active = "dashboard",
  onChange,
  onItemClick,
}: SidebarProps) {
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
          const selected = it.key === active;

          return (
            <ListItemButton
              key={it.key}
              disabled={it.disabled}
              onClick={() => {
                onChange?.(it.key);
                onItemClick?.(); // 👈 cierra en móvil
              }}
              sx={{
                borderRadius: 2,
                mb: 0.75,
                py: 1.2,
                px: 1.25,
                color: selected ? "#1677ff" : "text.secondary",
                bgcolor: selected ? "rgba(22, 119, 255, 0.10)" : "transparent",
                "&:hover": {
                  bgcolor: selected
                    ? "rgba(22, 119, 255, 0.14)"
                    : "action.hover",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: selected ? "#1677ff" : "text.disabled",
                }}
              >
                {it.icon}
              </ListItemIcon>

              <ListItemText
                primary={
                  <Typography
                    sx={{ fontWeight: selected ? 700 : 600, fontSize: 15 }}
                  >
                    {it.label}
                  </Typography>
                }
              />

              {typeof it.badge === "number" && (
                <Badge
                  badgeContent={`+${it.badge}`}
                  sx={{
                    "& .MuiBadge-badge": {
                      right: 6,
                      top: 12,
                      transform: "none",
                      bgcolor: "#ffe7dd",
                      color: "#9a3b2a",
                      fontWeight: 700,
                      borderRadius: 2,
                      px: 1,
                      py: 0.2,
                    },
                  }}
                />
              )}
            </ListItemButton>
          );
        })}
      </List>

      <Box sx={{ flex: 1 }} />
    </Box>
  );
}
