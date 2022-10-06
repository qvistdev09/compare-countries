import Cells from "../components/Cells";

const columns: ColumnConfig[] = [
  {
    label: "Flag",
    modes: ["LIST"],
    component: Cells.Flag,
  },
  {
    label: "Capital",
    modes: ["LIST"],
    component: Cells.Capital,
  },
  {
    label: "Population",
    modes: ["LIST", "GRAPH"],
    component: Cells.Population,
  },
  {
    label: "Area",
    modes: ["LIST", "GRAPH"],
    component: Cells.Area,
  },
  {
    label: "Demonym",
    modes: ["LIST"],
    component: Cells.Demonym,
  },
  {
    label: "Gini",
    modes: ["LIST", "GRAPH"],
    tooltip:
      "A measure of inequality of income or wealth, where 100% represents complete inequality and 0% complete equality.",
    component: Cells.Gini,
  },
];

export interface ColumnConfig {
  label: string;
  modes: Array<"LIST" | "GRAPH">;
  tooltip?: string;
  component: (props: Cells.CellProps) => JSX.Element;
}

export default columns;
