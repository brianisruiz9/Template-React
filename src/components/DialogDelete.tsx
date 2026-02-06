import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import type { UserRow } from "../types/user";
import { useTranslation } from "react-i18next";

interface DialogDeleteProps {
  deleteOpen: boolean;
  setDeleteOpen: (open: boolean) => void;
  selectedRow: UserRow | null;
  setSelectedRow: (row: UserRow | null) => void;
  setRows: React.Dispatch<React.SetStateAction<UserRow[]>>;
  message?: string;
}

export default function DialogDelete(props: DialogDeleteProps) {
  const { deleteOpen, setDeleteOpen, selectedRow, setSelectedRow, setRows, message } =
    props;
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const { t } = useTranslation();

  const closeDelete = () => {
    setDeleteOpen(false);
    setSelectedRow(null);
  };

  const handleDelete = () => {
    if (!selectedRow) return;
    setRows((prev) => prev.filter((r) => r.id !== selectedRow.id));
    setSnackMsg(t("alerts.delete_success"));
    setSnackOpen(true);
    closeDelete();
    setSelectedRow(null);
  };

  return (
    <>
      <Dialog open={deleteOpen} onClose={closeDelete} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700 }}>{t("users.delete_user")}</DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Typography sx={{ color: "text.secondary" }}>
            {message}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleDelete} variant="contained">
            {t("buttons.delete")}
          </Button>
          <Button onClick={closeDelete} variant="contained">
            {t("buttons.cancel")}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2500}
        onClose={() => setSnackOpen(false)}
      >
        <Alert
          onClose={() => setSnackOpen(false)}
          severity="success"
          variant="filled"
        >
          {snackMsg}
        </Alert>
      </Snackbar>
    </>
  );
}
