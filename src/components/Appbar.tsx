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
  onSearchClick,
  onNotificationsClick,
}: TopAppBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openDialog, setOpenDialog] = useState(false);

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
          <Tooltip title="Menu">
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
          {/* Search */}
          <Tooltip title="Search">
            <IconButton onClick={onSearchClick} aria-label="search">
              <Icon icon="solar:magnifer-outline" width="24" height="24" />
            </IconButton>
          </Tooltip>

          {/* Language flag */}
          <Tooltip title="Dark Mode">
            <IconButton aria-label="language" sx={{ p: 0.5 }}>
              <Icon icon="solar:moon-bold" width="24" height="24" />
            </IconButton>
          </Tooltip>

          {/* Notifications */}
          <Tooltip title="Notifications">
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
          <Tooltip title="Account">
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
          Cerrar sesión
        </MenuItem>
      </Menu>

      <DialogQuestion
        dialogOpen={openDialog}
        setDialogOpen={setOpenDialog}
        message={"¿Estás seguro de que deseas cerrar sesión?"}
        tittle={"Cerrar sesión"}
        handleConfirm={handleConfirmLogout}
        handleCancel={() => setOpenDialog(false)}
        setSnackOpen={() => {}}
      />
    </AppBar>
  );
}
