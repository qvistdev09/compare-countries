import { useState } from "react";
import columns from "../config/columns";

export default function useColumns(currentViewMode: "GRAPH" | "LIST") {
  const [checkedColumns, setCheckedColumns] = useState<string[]>(
    columns.map((column) => column.label)
  );

  function getColumnConfig(label: string) {
    return columns.find((column) => column.label === label);
  }

  function columnIsChecked(label: string) {
    return checkedColumns.includes(label);
  }

  function columnIsEnabled(label: string) {
    return !!getColumnConfig(label)?.modes.includes(currentViewMode);
  }

  function toggleColumn(label: string) {
    if (!columnIsEnabled(label)) {
      return;
    }
    if (checkedColumns.includes(label)) {
      return setCheckedColumns(checkedColumns.filter((column) => column !== label));
    }
    return setCheckedColumns([...checkedColumns, label]);
  }

  return {
    columnCheckboxes: columns.map((column) => ({
      label: column.label,
      checked: columnIsChecked(column.label),
      enabled: columnIsEnabled(column.label),
      onClick: () => toggleColumn(column.label),
      tooltip: column.tooltip,
    })),
  };
}
