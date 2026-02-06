import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { GridColDef } from "@mui/x-data-grid";
import type { Post } from "../../types/post";
import { useTranslation } from "react-i18next";
import DataGrid from "../../components/DataGrid";
import api from "../../api";
import PostForm from "./PostForm";
import DialogQuestion from "../../components/DialogQuestion";

export default function Posts() {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<Post[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const openMenu = Boolean(anchorEl);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState("");

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get<Post[]>("/posts");
      setRows(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRows = rows.filter((r) => {
    const s = search.toLowerCase().trim();
    if (!s) return true;
    return (
      r.title.toLowerCase().includes(s) || r.body.toLowerCase().includes(s)
    );
  });

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, row: Post) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = async () => {
    setLoading(true);
    if (!selectedRow) return;
    try {
      await api.delete(`/posts/${selectedRow.id}`);
      setRows((prev) => prev.filter((r) => r.id !== selectedRow.id));
      setSnackMsg(t("alerts.post_delete_success"));
      setSnackOpen(true);
      closeDelete();
      setSelectedRow(null);
      setLoading(false);
    } catch (e) {
      setSnackMsg(`${e}` || t("alerts.post_delete_error"));
      setSnackOpen(true);
      setLoading(false);
    }
  };

  const closeDelete = () => {
    setDeleteOpen(false);
    setSelectedRow(null);
  };

  const columns: GridColDef<Post>[] = [
    { field: "id", headerName: "ID", width: 90, disableColumnMenu: true },
    {
      field: "title",
      headerName: t("posts.title"),
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "userId",
      headerName: t("posts.user"),
      width: 110,
      disableColumnMenu: true,
    },
    {
      field: "body",
      headerName: t("posts.body"),
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "actions",
      headerName: "",
      flex: 0.5,
      sortable: false,
      filterable: false,
      width: 60,
      align: "center",
      disableColumnMenu: true,
      renderCell: (params) => (
        <IconButton size="small" onClick={(e) => handleOpenMenu(e, params.row)}>
          <Icon icon="eva:more-vertical-fill" height="24" width="24" />
        </IconButton>
      ),
    },
  ];

  const handleOpenEdit = () => {
    setEditOpen(true);
    handleCloseMenu();
  };

  const handleOpenDelete = () => {
    if (!selectedRow) return;
    setDeleteOpen(true);
    handleCloseMenu();
  };

  return (
    <Box sx={{ px: { xs: 2, md: 3 }, py: 2 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
          {t("posts.posts")}
        </Typography>

        <Button
          size="small"
          variant="contained"
          startIcon={<Icon icon="mingcute:add-line" />}
          sx={{ px: 2 }}
          onClick={handleOpenEdit}
        >
          {t("posts.new_post")}
        </Button>
      </Box>

      {/* Table */}
      <DataGrid
        rows={filteredRows}
        setRows={setRows}
        columns={columns}
        search={search}
        setSearch={setSearch}
        loading={loading}
      />

      {/* Menu 3 puntos */}
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleCloseMenu}>
        <MenuItem onClick={handleOpenEdit}>
          <ListItemIcon>
            <Icon
              icon="solar:pen-new-round-bold-duotone"
              width="24"
              height="24"
            />
          </ListItemIcon>
          <ListItemText primary={t("datagrid.edit")} />
        </MenuItem>
        <MenuItem onClick={handleOpenDelete}>
          <ListItemIcon>
            <Icon
              icon="solar:trash-bin-trash-bold-duotone"
              width="24"
              height="24"
            />
          </ListItemIcon>
          <ListItemText primary={t("datagrid.delete")} />
        </MenuItem>
      </Menu>

      {/* Dialog Edit */}
      <PostForm
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        setRows={setRows}
      />

      {/* Dialog Delete */}
      <DialogQuestion
        dialogOpen={deleteOpen}
        setDialogOpen={setDeleteOpen}
        handleConfirm={handleDelete}
        handleCancel={closeDelete}
        message={t("alerts.delete_post_question")}
        tittle={t("posts.delete_post")}
        snackMsg={snackMsg}
        snackOpen={snackOpen}
        setSnackOpen={setSnackOpen}
        loading={loading}
      />
    </Box>
  );
}
