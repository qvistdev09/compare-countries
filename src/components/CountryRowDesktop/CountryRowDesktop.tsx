import { Country } from "../../types";
import columns from "../../config/columns";

export default function CountryRowDesktop({ country, activeColumns, isLastRow, isShaded }: Props) {
  const columnsToRender = columns.filter((column) => activeColumns.includes(column.label));
  const lastColumnIndex = columnsToRender.length - 1;

  return (
    <>
      {columnsToRender.map((column, index) => {
        const Component = column.component;
        const columnPosition =
          index === 0 ? "left-end" : index === lastColumnIndex ? "right-end" : "middle";
        return (
          <Component
            key={column.label}
            country={country}
            isLastRow={isLastRow}
            isShaded={isShaded}
            columnPosition={columnPosition}
          />
        );
      })}
    </>
  );
}

interface Props {
  country: Country;
  activeColumns: string[];
  isLastRow: boolean;
  isShaded: boolean;
}
