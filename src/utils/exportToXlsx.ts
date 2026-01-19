import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

type ExportOptions<T extends Record<string, unknown>> = {
  data: T[];
  fileName?: string; // "users"
  sheetName?: string; // "Users"
  columns?: Array<{
    field: keyof T;
    headerName: string;
  }>;
};

export function exportToXlsx<T extends Record<string, unknown>>({
  data,
  fileName = "export",
  sheetName = "Sheet1",
  columns,
}: ExportOptions<T>) {
  // Si pasan columns, exporta solo esas columnas y con esos headers
  const rows = columns
    ? data.map((row) => {
        const out: Record<string, unknown> = {};
        for (const col of columns) out[col.headerName] = row[col.field];
        return out;
      })
    : data;

  const worksheet = XLSX.utils.json_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

  const arrayBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([arrayBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
}
