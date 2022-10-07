import Cells from "../components/Cells";
import Headers from "../components/Headers";

const columns: ColumnConfig[] = [
  {
    label: "Flag",
    modes: ["LIST"],
    component: Cells.Flag,
    header: Headers.Flag,
  },
  {
    label: "Capital",
    modes: ["LIST"],
    component: Cells.Capital,
    header: Headers.Capital,
  },
  {
    label: "Population",
    modes: ["LIST", "GRAPH"],
    component: Cells.Population,
    header: Headers.Population,
  },
  {
    label: "Area",
    modes: ["LIST", "GRAPH"],
    component: Cells.Area,
    header: Headers.Area,
  },
  {
    label: "Demonym",
    modes: ["LIST"],
    component: Cells.Demonym,
    header: Headers.Demonym,
  },
  {
    label: "Gini",
    modes: ["LIST", "GRAPH"],
    tooltip:
      "A measure of inequality of income or wealth, where 100% represents complete inequality and 0% complete equality.",
    component: Cells.Gini,
    header: Headers.Gini,
  },
];

export interface ColumnConfig {
  label: string;
  modes: Array<"LIST" | "GRAPH">;
  tooltip?: string;
  component: (props: Cells.CellProps) => JSX.Element;
  header: (props: Headers.HeaderProps) => JSX.Element;
}

export default columns;
