import {
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  OutlinedInput,
} from "@mui/material";
import DialogForm from "../../components/DialogForm";
import type { UserRow } from "../../types/user";

interface UserFormProps {
  selectedRow: UserRow | null;
  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  setRows: React.Dispatch<React.SetStateAction<UserRow[]>>;
}

export default function UserForm(props: UserFormProps) {
  const { selectedRow, editOpen, setEditOpen, setRows } = props;
  console.log("selectedRow en UserForm:", selectedRow);

  const closeEdit = () => {
    setEditOpen(false);
  };

  const saveEdit = () => {
    if (!selectedRow) return;

    setRows((prev) =>
      prev.map((r) =>
        r.id === selectedRow.id
          ? {
              ...r,
              name: selectedRow.name,
              company: selectedRow.company,
              role: selectedRow.role,
              status: selectedRow.status,
            }
          : r
      )
    );

    closeEdit();
  };

  const handleChange = (field: keyof UserRow, value: string) => {
    if (selectedRow) {
      Object.assign(selectedRow, { [field]: value });
    }
  };

  return (
    <DialogForm editOpen={editOpen} closeEdit={closeEdit} saveEdit={saveEdit}>
      <TextField
        label="Nombre"
        defaultValue={selectedRow?.name ?? ""}
        onChange={(e) => handleChange("name", e.target.value)}
        fullWidth
        sx={{ mt: 0.8 }}
      />

      <TextField
        label="Company"
        defaultValue={selectedRow?.company ?? ""}
        onChange={(e) => handleChange("company", e.target.value)}
        fullWidth
      />

      <TextField
        label="Role"
        defaultValue={selectedRow?.role ?? ""}
        onChange={(e) => handleChange("role", e.target.value)}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          input={<OutlinedInput label="Status" />}
          defaultValue={selectedRow?.status ?? "Active"}
          onChange={(e: SelectChangeEvent) =>
            handleChange("status", e.target.value)
          }
        >
          <MenuItem value="Active">Active</MenuItem>
          <MenuItem value="Inactive">Inactive</MenuItem>
        </Select>
      </FormControl>
    </DialogForm>
  );
}
