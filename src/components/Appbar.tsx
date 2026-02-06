import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Avatar,
  Tooltip,
  useMediaQuery,
  Menu,
  MenuItem,
  Typography,
  Divider,
  ListItemIcon,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/auth/authSlice";
import { setMode, toggleLanguage } from "../store/ui/uiSlice";
import { useTranslation } from "react-i18next";
import DialogQuestion from "./DialogQuestion";

type TopAppBarProps = {
  onToggleSidebar: () => void;
  notificationsCount?: number;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
};

export default function TopAppBar({
  onToggleSidebar,
  notificationsCount = 2,
  onNotificationsClick,
}: TopAppBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const modeApp = useAppSelector((s) => s.ui.mode);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);
  const { t } = useTranslation();

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    handleCloseMenu();
    navigate("/sign-in", { replace: true });
  };

  const handleDarkMode = () => {
    if (modeApp === "dark") {
      dispatch(setMode("light"));
      return;
    } else if (modeApp === "light") {
      dispatch(setMode("dark"));
      return;
    }
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Toolbar sx={{ minHeight: 64 }}>
        {/* Toggle sidebar */}
        {isMobile && (
          <Tooltip title={t("menu.menu")}>
            <IconButton
              onClick={onToggleSidebar}
              aria-label="toggle sidebar"
              edge="start"
            >
              <Icon
                icon="solar:hamburger-menu-outline"
                width="24"
                height="24"
              />
            </IconButton>
          </Tooltip>
        )}

        {/* Left side  */}
        <Box sx={{ flex: 1 }} />

        {/* Right actions */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Language */}
          <Tooltip title={t("menu.language")}>
            <IconButton
              onClick={() => dispatch(toggleLanguage())}
              aria-label="lang"
            >
              <Icon icon="solar:global-bold-duotone" width="24" height="24" />
            </IconButton>
          </Tooltip>

          {/* Dark mode */}
          <Tooltip
            title={
              modeApp === "light" ? t("menu.dark_mode") : t("menu.light_mode")
            }
          >
            <IconButton
              aria-label="dark"
              sx={{ p: 0.5 }}
              onClick={handleDarkMode}
            >
              <Icon
                icon={
                  modeApp === "light"
                    ? "solar:moon-bold"
                    : "solar:sun-2-bold-duotone"
                }
                width="24"
                height="24"
              />
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title={t("menu.notifications")}>
            <IconButton
              onClick={onNotificationsClick}
              aria-label="notifications"
            >
              <Badge
                badgeContent={notificationsCount}
                color="error"
                overlap="circular"
              >
                <Icon
                  icon="solar:bell-bing-bold-duotone"
                  width="24"
                  height="24"
                />
              </Badge>
            </IconButton>
          </Tooltip>

          {/* Avatar with ring */}
          <Tooltip title={t("menu.account")}>
            <IconButton
              onClick={handleOpenMenu}
              aria-label="account"
              sx={{ p: 0 }}
            >
              <Box
                sx={{
                  p: "2px",
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: "primary.light",
                  display: "inline-flex",
                }}
              >
                <Avatar
                  src={""}
                  alt="User"
                  sx={{
                    width: 34,
                    height: 34,
                  }}
                >
                  {user?.name?.charAt(0).toUpperCase() ?? "U"}
                </Avatar>
              </Box>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 200,
            borderRadius: 2,
          },
        }}
      >
        {/* Usuario */}
        <Box sx={{ px: 2, py: 1 }}>
          <Typography sx={{ fontWeight: 700 }}>
            {user?.name ?? "Usuario"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>

        <Divider />

        {/* Logout */}
        <MenuItem onClick={() => setOpenDialog(true)}>
          <ListItemIcon>
            <Icon icon="solar:logout-2-bold-duotone" height={24} width={24} />
          </ListItemIcon>
          {t("menu.logout")}
        </MenuItem>
      </Menu>

      <DialogQuestion
        dialogOpen={openDialog}
        setDialogOpen={setOpenDialog}
        message={t("alerts.question_logout")}
        tittle={t("menu.logout")}
        handleConfirm={handleConfirmLogout}
        handleCancel={() => setOpenDialog(false)}
        setSnackOpen={() => {}}
      />
    </AppBar>
  );
}
