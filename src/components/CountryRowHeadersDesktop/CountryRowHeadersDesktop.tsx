import columns from "../../config/columns";

export default function CountryRowHeadersDesktop({
  sortFunction,
  currentSort,
  activeColumns,
}: Props) {
  const headersToRender = columns.filter((column) => activeColumns.includes(column.label));
  const lastColumnIndex = headersToRender.length - 1;

  return headersToRender.map((header, index) => {
    const Component = header.header;
    const columnPosition =
      index === 0 ? "left-end" : index === lastColumnIndex ? "right-end" : "middle";
    return (
      <Component
        key={header.label}
        position={columnPosition}
        sortFunction={sortFunction}
        currentSort={currentSort}
      />
    );
  });
}

interface Props {
  sortFunction: (label: string, direction: "ASC" | "DESC") => void;
  currentSort: { column: string; direction: "ASC" | "DESC" };
  activeColumns: string[];
}
