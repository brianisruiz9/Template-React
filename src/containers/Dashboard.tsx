import { Grid } from "@mui/material";
import StatCard from "../components/StatCard";
import { Icon } from "@iconify/react";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title={t("dashboard.Weekly sales")}
          value="714k"
          change={2.6}
          icon={<Icon icon="solar:bag-4-bold-duotone" width="24" height="24" />}
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title={t("dashboard.New users")}
          value="1.35m"
          change={-0.1}
          icon={
            <Icon
              icon="solar:user-circle-bold-duotone"
              width="24"
              height="24"
            />
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title={t("dashboard.Purchase orders")}
          value="1.72m"
          change={2.8}
          icon={
            <Icon
              icon="solar:cart-large-2-bold-duotone"
              width="24"
              height="24"
            />
          }
        />
      </Grid>

      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <StatCard
          title={t("dashboard.Messages")}
          value="234"
          change={3.6}
          icon={
            <Icon icon="solar:letter-bold-duotone" width="24" height="24"  />
          }
        />
      </Grid>
    </Grid>
  );
}
