import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface DialogEditProps {
  children: React.ReactNode;
  editOpen: boolean;
  closeEdit: () => void;
  saveEdit: () => void;
  title: string;
  loading?: boolean;
}

export default function DialogForm(props: DialogEditProps) {
  const { children, editOpen, closeEdit, saveEdit, title, loading } = props;
  const { t } = useTranslation();

  return (
    <Dialog open={editOpen} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>

      <DialogContent sx={{ pt: 1, display: "grid", gap: 2 }}>
        {children}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={saveEdit}
          variant="contained"
          loading={loading}
          loadingPosition="start"
        >
          {t("buttons.save")}
        </Button>
        <Button onClick={closeEdit} variant="contained" disabled={loading}>
          {t("buttons.cancel")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
