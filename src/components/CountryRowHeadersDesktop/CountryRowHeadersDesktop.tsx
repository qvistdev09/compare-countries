import columns from "../../config/columns";

export default function CountryRowHeadersDesktop({
  sortFunction,
  currentSorting,
  activeColumns,
}: Props) {
  const headersToRender = columns.filter((column) => activeColumns.includes(column.label));
  const lastColumnIndex = headersToRender.length - 1;
}

interface Props {
  sortFunction: (label: string, direction: "ASC" | "DESC") => void;
  currentSorting: { label: string; direction: "ASC" | "DESC" };
  activeColumns: string[];
}
