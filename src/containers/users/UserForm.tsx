import { useState, useEffect } from "react";
import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
  Snackbar,
  Alert,
} from "@mui/material";
import DialogForm from "../../components/DialogForm";
import type { UserRow } from "../../types/user";
import { useTranslation } from "react-i18next";

interface UserFormProps {
  selectedRow: UserRow | null;
  setSelectedRow: (row: UserRow | null) => void;
  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  setRows: React.Dispatch<React.SetStateAction<UserRow[]>>;
}

export default function UserForm(props: UserFormProps) {
  const { selectedRow, setSelectedRow, editOpen, setEditOpen, setRows } = props;
  const { t } = useTranslation();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [form, setForm] = useState({
    id: 0,
    name: "",
    company: "",
    role: "",
    status: "Active",
    verified: false,
  });

  useEffect(() => {
    if (selectedRow) {
      // 👉 MODO EDITAR
      setForm({
        id: selectedRow.id,
        name: selectedRow.name,
        company: selectedRow.company,
        role: selectedRow.role,
        status: selectedRow.status,
        verified: selectedRow.verified,
      });
    } else {
      // 👉 MODO CREAR
      setForm({
        id: 0,
        name: "",
        company: "",
        role: "",
        status: "Active",
        verified: false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow?.id]);

  const closeEdit = () => {
    setEditOpen(false);
    setSelectedRow(null);
    setForm({
      id: 0,
      name: "",
      company: "",
      role: "",
      status: "Active",
      verified: false,
    });
  };

  const saveEdit = () => {
    if (selectedRow) {
      setRows((prev) =>
        prev.map((r) =>
          r.id === selectedRow.id
            ? {
                ...r,
                name: form.name,
                company: form.company,
                role: form.role,
                status: form.status as "Active" | "Inactive",
              }
            : r
        )
      );
      setSnackMsg(`Usuario editado exitosamente`);
    } else {
      setRows((prev) => [
        ...prev,
        {
          id: 9,
          name: form.name.trim(),
          company: form.company.trim(),
          role: form.role.trim(),
          status: form.status as "Active" | "Inactive",
          verified: form.verified,
        },
      ]);

      setSnackMsg("Usuario creado correctamente");
    }

    setSnackOpen(true);
    setSelectedRow(null);
    closeEdit();
  };

  const handleChange = (field: keyof UserRow, value: string) => {
    if (field === "status") {
      setForm((p) => ({ ...p, status: value as UserRow["status"] }));
    } else {
      setForm((p) => ({ ...p, [field]: value }));
    }
  };

  return (
    <>
      <DialogForm
        editOpen={editOpen}
        closeEdit={closeEdit}
        saveEdit={saveEdit}
        title={selectedRow ? t("users.edit_user") : t("users.create_user")}
      >
        <TextField
          label={t("users.name")}
          defaultValue={form?.name}
          onChange={(e) => handleChange("name", e.target.value)}
          fullWidth
          sx={{ mt: 0.8 }}
        />

        <TextField
          label={t("users.company")}
          defaultValue={form?.company}
          onChange={(e) => handleChange("company", e.target.value)}
          fullWidth
        />

        <TextField
          label={t("users.role")}
          defaultValue={form?.role}
          onChange={(e) => handleChange("role", e.target.value)}
          fullWidth
        />

        <FormControl fullWidth>
          <InputLabel>{t("users.status")}</InputLabel>
          <Select
            label={t("users.status")}
            input={<OutlinedInput label={t("users.status")} />}
            defaultValue={form?.status}
            onChange={(e: SelectChangeEvent) =>
              handleChange("status", e.target.value)
            }
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </Select>
        </FormControl>
      </DialogForm>

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
