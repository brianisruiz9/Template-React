import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface DialogEditProps {
  children: React.ReactNode;
  editOpen: boolean;
  closeEdit: () => void;
  saveEdit: () => void;
  title: string;
}

export default function DialogForm(props: DialogEditProps) {
  const { children, editOpen, closeEdit, saveEdit, title } = props;

  return (
    <Dialog open={editOpen} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: 700 }}>{title}</DialogTitle>

      <DialogContent sx={{ pt: 1, display: "grid", gap: 2 }}>
        {children}
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button onClick={saveEdit} variant="contained">
          Save
        </Button>
        <Button onClick={closeEdit} variant="contained">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
