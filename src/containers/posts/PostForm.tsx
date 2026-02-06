import { useState, useEffect } from "react";
import { TextField, Snackbar, Alert } from "@mui/material";
import DialogForm from "../../components/DialogForm";
import type { Post } from "../../types/post";
import api from "../../api";
import { useTranslation } from "react-i18next";

interface PostFormProps {
  selectedRow: Post | null;
  setSelectedRow: (row: Post | null) => void;
  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
  setRows: React.Dispatch<React.SetStateAction<Post[]>>;
}

export default function UserForm(props: PostFormProps) {
  const { selectedRow, setSelectedRow, editOpen, setEditOpen, setRows } = props;
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");
  const [form, setForm] = useState({
    id: 0,
    title: "",
    body: "",
    userId: 1,
  });

  useEffect(() => {
    if (selectedRow) {
      // 👉 MODO EDITAR
      setForm({
        id: selectedRow.id,
        title: selectedRow.title,
        body: selectedRow.body,
        userId: selectedRow.userId,
      });
    } else {
      // 👉 MODO CREAR
      setForm({
        id: 0,
        title: "",
        body: "",
        userId: 1,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow?.id]);

  const closeEdit = () => {
    setEditOpen(false);
    setSelectedRow(null);
    setForm({
      id: 0,
      title: "",
      body: "",
      userId: 1,
    });
  };

  const handleChange = (field: keyof Post, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
  };

  const saveEdit = async () => {
    setLoading(true);
    if (selectedRow) {
      //editar
      const { data } = await api.put<Post>(`/posts/${selectedRow.id}`, form);
      setRows((prev) =>
        prev.map((r) => (r.id === selectedRow.id ? { ...r, ...data } : r))
      );
      setSnackMsg(t("alerts.post_edit_success"));
    } else {
      //crear
      const { data } = await api.post<Post>("/posts", form);
      setRows((prev) => [...prev, data]);
      setSnackMsg(t("alerts.post_edit_success"));
    }
    setSnackOpen(true);
    setSelectedRow(null);
    closeEdit();
    setLoading(false);
  };

  return (
    <>
      <DialogForm
        editOpen={editOpen}
        closeEdit={closeEdit}
        saveEdit={saveEdit}
        title={selectedRow ? t("posts.edit_post") : t("posts.new_post")}
        loading={loading}
      >
        <TextField
          label={t("posts.title")}
          defaultValue={form?.title}
          onChange={(e) => handleChange("title", e.target.value)}
          fullWidth
          sx={{ mt: 0.8 }}
        />

        <TextField
          label={t("posts.body")}
          defaultValue={form?.body}
          onChange={(e) => handleChange("body", e.target.value)}
          fullWidth
          minRows={4}
          multiline
        />
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
