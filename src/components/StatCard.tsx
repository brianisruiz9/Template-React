import * as React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";

type StatCardProps = {
  title: string;
  value: string;
  change?: number;
  icon?: React.ReactNode;
};

export default function StatCard({
  title,
  value,
  change,
  icon,
}: StatCardProps) {
  const isPositive = typeof change === "number" ? change >= 0 : true;

  return (
    <Card
      elevation={0}
      sx={{
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ p: 2.25 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.5 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              borderRadius: 2,
              display: "grid",
              placeItems: "center",
              bgcolor: "action.hover",
              color: "gray",
            }}
          >
            {icon}
          </Box>

          <Box sx={{ flex: 1 }}>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", fontWeight: 600 }}
              >
                {title}
              </Typography>

              {typeof change === "number" && (
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 700,
                    color: isPositive ? "success.main" : "error.main",
                  }}
                >
                  {isPositive ? "+" : ""}
                  {change}%
                </Typography>
              )}
            </Box>

            <Typography variant="h5" sx={{ mt: 1, fontWeight: 800 }}>
              {value}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
