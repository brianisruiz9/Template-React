import * as React from "react";
import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import { exportToXlsx } from "../utils/exportToXlsx";
import { useAppSelector } from "../store/hooks";
import { useTranslation } from "react-i18next";

interface CustomDataGridProps<T extends { id: number | string }> {
  rows: T[];
  setRows: React.Dispatch<React.SetStateAction<T[]>>;
  columns: GridColDef<T>[];
  search: string;
  setSearch: (value: string) => void;
  loading?: boolean;
  tableName?: string;
}

export default function CustomDataGrid<T extends { id: number | string }>(
  props: CustomDataGridProps<T>
) {
  const { rows, setRows, columns, search, setSearch, loading, tableName } =
    props;
  const [rowSelectionModel, setRowSelectionModel] =
    React.useState<GridRowSelectionModel>({ type: "include", ids: new Set() });
  const selectedCount =
    rowSelectionModel.type === "include"
      ? rowSelectionModel.ids.size
      : rows.length - rowSelectionModel.ids.size;
  const [snackOpen, setSnackOpen] = React.useState(false);
  const [snackMsg, setSnackMsg] = React.useState("");
  const mode = useAppSelector((s) => s.ui.mode);
  const { t } = useTranslation();

  const handleExportToXlsx = () => {
    exportToXlsx({
      data: rows,
      fileName: tableName ?? "data",
      sheetName: tableName ?? "data",
      columns: columns.map((col) => ({
        field: col.field as keyof T,
        headerName: col.headerName ?? String(col.field),
      })),
    });
  };

  const handleDeleteSelected = () => {
    if (rowSelectionModel.type === "include") {
      if (rowSelectionModel.ids.size === 0) return;
      setRows((prev) => prev.filter((r) => !rowSelectionModel.ids.has(r.id)));
    } else {
      setRows((prev) => prev.filter((r) => rowSelectionModel.ids.has(r.id)));
    }

    setRowSelectionModel({ type: "include", ids: new Set() });
    setSnackMsg("Usuarios eliminados correctamente");
    setSnackOpen(true);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      {/* Search row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          px: 2,
          py: 3,
        }}
      >
        <TextField
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder={t("users.search_user")}
          size="small"
          sx={{
            width: { xs: "100%", sm: 420 },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "divider",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "divider",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.main",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon icon="solar:magnifer-linear" />
              </InputAdornment>
            ),
          }}
        />

        <Box sx={{ flex: 1 }} />

        <Tooltip title="Export">
          <IconButton onClick={handleExportToXlsx}>
            <Icon icon="solar:download-minimalistic-bold" />
          </IconButton>
        </Tooltip>
      </Box>

      <Box>
        {selectedCount > 0 && (
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              alignItems: "center",
              gap: 2,
              borderTop: "1px solid",
              borderBottom: "1px solid",
              borderColor: "divider",
              bgcolor: mode === "light" ? "#F9FAFB" : "#0F1214",
            }}
          >
            <Typography>
              {selectedCount} {t("datagrid.row")}
              {selectedCount > 1 ? "s" : ""} {t("datagrid.selected")}
            </Typography>

            <Tooltip title={t("datagrid.delete")}>
              <IconButton size="small" onClick={handleDeleteSelected}>
                <Icon icon="solar:trash-bin-trash-bold-duotone" />
              </IconButton>
            </Tooltip>
          </Box>
        )}

        <DataGrid
          loading={loading}
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
          rowSelectionModel={rowSelectionModel}
          onRowSelectionModelChange={(m) => setRowSelectionModel(m)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
          sx={{
            border: 0,

            /* HEADER */
            "& .MuiDataGrid-columnHeaders": {
              color: mode === "light" ? "#637381" : "#FFFFFF",
            },
            "& .MuiDataGrid-columnHeader": {
              outline: "none",
              backgroundColor: mode === "light" ? "#F4F6F8" : "#252526",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },

            /* CHECKBOX HEADER */
            "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitle":
              {
                display: "none",
              },

            /* ROWS */
            "& .MuiDataGrid-row:hover": {
              backgroundColor: mode === "light" ? "#F9FAFB" : "#0F1214",
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },

            "& .MuiDataGrid-selectedRowCount": {
              display: "none",
            },
          }}
        />
      </Box>
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
    </Paper>
  );
}
