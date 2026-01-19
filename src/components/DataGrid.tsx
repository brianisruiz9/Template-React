import {
  Paper,
  Box,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Icon } from "@iconify/react";
import type { UserRow } from "../types/user";
import { exportToXlsx } from "../utils/exportToXlsx";

interface CustomDataGridProps {
  rows: UserRow[];
  columns: GridColDef[];
  search: string;
  setSearch: (value: string) => void;
}

export default function CustomDataGrid(props: CustomDataGridProps) {
  const { rows, columns, search, setSearch } = props;

  const handleExportToXlsx = () => {
    exportToXlsx({
      data: rows,
      fileName: "users",
      sheetName: "Users",
      columns: columns.map((col) => ({
        field: col.field as keyof UserRow,
        headerName: col.headerName ?? String(col.field),
      })),
    });
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
          placeholder="Search user..."
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
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          disableRowSelectionOnClick
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
              color: "#637381",
            },
            "& .MuiDataGrid-columnHeader": {
              outline: "none",
              backgroundColor: "#F4F6F8",
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
              backgroundColor: "#F9FAFB",
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-columnHeader:focus": {
              outline: "none",
            },
            "& .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
          }}
        />
      </Box>
    </Paper>
  );
}
