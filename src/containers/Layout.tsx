import { useState, useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import { Box, useMediaQuery, Drawer } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Appbar from "../components/Appbar";
import Sidebar from "../components/Sidebar";

export default function Layout() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = useAppSelector((s) => s.auth.token);

  useEffect(() => {
    if (isMobile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMobileOpen(false);
    }
    if (!token) {
      navigate("/sign-in");
    }
  }, [isMobile, token, navigate]);

  const handleToggleSidebar = () => {
    if (isMobile) setMobileOpen((v) => !v);
    else setDesktopOpen((v) => !v);
  };

  return (
    <div>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar Desktop */}
        {!isMobile && desktopOpen && (
          <Box
            sx={{
              flexShrink: 0,
              borderRight: "1px solid",
              borderColor: "divider",
            }}
          >
            <Sidebar />
          </Box>
        )}

        {/* Sidebar Mobile */}
        <Drawer
          open={isMobile && mobileOpen}
          onClose={() => setMobileOpen(false)}
          variant="temporary"
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              borderRight: "1px solid",
              borderColor: "divider",
            },
          }}
        >
          <Sidebar onItemClick={() => setMobileOpen(false)} />
        </Drawer>

        {/* Main */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <Appbar onToggleSidebar={handleToggleSidebar} />
          <Box sx={{ p: { xs: 2, md: 3 }, flex: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
