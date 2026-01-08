import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Badge,
  Avatar,
  Tooltip,
  useMediaQuery
} from "@mui/material";
import { Icon } from "@iconify/react";

type TopAppBarProps = {
  onToggleSidebar: () => void;
  notificationsCount?: number;
  onSearchClick?: () => void;
  onNotificationsClick?: () => void;
  onAvatarClick?: () => void;
};

export default function TopAppBar({
  onToggleSidebar,
  notificationsCount = 2,
  onSearchClick,
  onNotificationsClick,
  onAvatarClick,
}: TopAppBarProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#fff",
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
              onClick={onAvatarClick}
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
                  U
                </Avatar>
              </Box>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
