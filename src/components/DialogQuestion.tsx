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

interface DialogQuestionProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  message?: string;
  tittle?: string;
  handleConfirm: () => void;
  handleCancel: () => void;
  snackMsg?: string;
  snackOpen?: boolean;
  setSnackOpen: (snackOpen: boolean) => void;
  loading?: boolean;
}

export default function DialogQuestion(props: DialogQuestionProps) {
  const {
    dialogOpen,
    message,
    tittle,
    handleConfirm,
    handleCancel,
    snackMsg,
    snackOpen,
    setSnackOpen,
    loading,
  } = props;

  return (
    <>
      <Dialog open={dialogOpen} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontWeight: 700 }}>{tittle}</DialogTitle>

        <DialogContent sx={{ pt: 1 }}>
          <Typography sx={{ color: "text.secondary" }}>{message}</Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={handleConfirm}
            variant="contained"
            loading={loading}
            loadingPosition="start"
          >
            Confirm
          </Button>
          <Button onClick={handleCancel} variant="contained" disabled={loading}>
            Cancel
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
