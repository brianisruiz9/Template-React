import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { GridColDef } from "@mui/x-data-grid";
import type { UserRow } from "../../types/user";
import DataGrid from "../../components/DataGrid";
import UserForm from "./UserForm";
import DialogDelete from "../../components/DialogDelete";

const INITIAL_ROWS: UserRow[] = [
  {
    id: 1,
    name: "Kristen Wunsch",
    company: "Gutmann – Kassulke",
    role: "Full Stack Designer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "Eloise Ebert",
    company: "Hahn, Homenick and Lind",
    role: "HR Manager",
    verified: false,
    status: "Active",
  },
  {
    id: 3,
    name: "Brian Jacobs",
    company: "Howe – Anderson",
    role: "Full Stack Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "Mr. Conrad Spinka",
    company: "Johns – Aufderhar",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 5,
    name: "Dr. Lee Doyle-Grant",
    company: "Klein – Rolfson",
    role: "UI Designer",
    verified: false,
    status: "Active",
  },
  {
    id: 6,
    name: "Camila Torres",
    company: "Captus Tech Solutions",
    role: "Frontend Developer",
    verified: true,
    status: "Inactive",
  },
  {
    id: 7,
    name: "Juan Pérez",
    company: "Coljuegos",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
];

export default function Users() {
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState<UserRow[]>(INITIAL_ROWS);
  // menú 3 puntos
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<UserRow | null>(null);
  const openMenu = Boolean(anchorEl);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const filteredRows = rows.filter((r) => {
    const s = search.toLowerCase().trim();
    if (!s) return true;
    return (
      r.name.toLowerCase().includes(s) ||
      r.company.toLowerCase().includes(s) ||
      r.role.toLowerCase().includes(s)
    );
  });

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    row: UserRow
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleOpenEdit = () => {
    //if (!selectedRow) return;
    setEditOpen(true);
    handleCloseMenu();
  };

  const handleOpenDelete = () => {
    if (!selectedRow) return;
    setDeleteOpen(true);
    handleCloseMenu();
  };

  const columns: GridColDef<UserRow>[] = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      disableColumnMenu: true,
    },
    {
      field: "company",
      headerName: "Company",
      flex: 1,
      disableColumnMenu: true,
    },
    { field: "role", headerName: "Role", flex: 1, disableColumnMenu: true },
    {
      field: "verified",
      headerName: "Verified",
      flex: 0.5,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => (params.value ? "✅" : "-"),
    },
    {
      field: "status",
      headerName: "Status",
      flex: 0.5,
      sortable: false,
      filterable: false,
      //editable: true,
      disableReorder: true,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Chip
          size="small"
          label={params.value}
          sx={{
            fontWeight: 700,
            borderRadius: 2,
            bgcolor:
              params.value === "Active"
                ? "rgba(34,197,94,.15)"
                : "rgba(148,163,184,.25)",
            color:
              params.value === "Active" ? "success.dark" : "text.secondary",
          }}
        />
      ),
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
          Users
        </Typography>

        <Button
          size="small"
          variant="contained"
          startIcon={<Icon icon="mingcute:add-line" />}
          sx={{ px: 2 }}
          onClick={handleOpenEdit}
        >
          New user
        </Button>
      </Box>

      {/* Table */}
      <DataGrid
        rows={filteredRows}
        setRows={setRows}
        columns={columns}
        search={search}
        setSearch={setSearch}
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
          <ListItemText primary="Edit" />
        </MenuItem>
        <MenuItem onClick={handleOpenDelete}>
          <ListItemIcon>
            <Icon
              icon="solar:trash-bin-trash-bold-duotone"
              width="24"
              height="24"
            />
          </ListItemIcon>
          <ListItemText primary="Delete" />
        </MenuItem>
      </Menu>

      {/* Dialog Edit */}
      <UserForm
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        editOpen={editOpen}
        setEditOpen={setEditOpen}
        setRows={setRows}
      />

      {/* Dialog Delete */}
      <DialogDelete
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        selectedRow={selectedRow}
        setSelectedRow={setSelectedRow}
        setRows={setRows}
      />
    </Box>
  );
}
