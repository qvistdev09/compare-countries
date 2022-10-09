import Cells from "../components/Cells";
import Headers from "../components/Headers";

const columns: ColumnConfig[] = [
  {
    label: "Name",
    modes: ["LIST"],
    component: Cells.Name,
    header: Headers.Name,
    width: "1fr",
    canBeToggled: false,
  },
  {
    label: "Flag",
    modes: ["LIST"],
    component: Cells.Flag,
    header: Headers.Flag,
    width: "1fr",
    canBeToggled: true,
  },
  {
    label: "Capital",
    modes: ["LIST"],
    component: Cells.Capital,
    header: Headers.Capital,
    width: "1fr",
    canBeToggled: true,
  },
  {
    label: "Population",
    modes: ["LIST", "GRAPH"],
    component: Cells.Population,
    header: Headers.Population,
    width: "1fr",
    canBeToggled: true,
  },
  {
    label: "Area",
    modes: ["LIST", "GRAPH"],
    component: Cells.Area,
    header: Headers.Area,
    width: "1fr",
    canBeToggled: true,
  },
  {
    label: "Demonym",
    modes: ["LIST"],
    component: Cells.Demonym,
    header: Headers.Demonym,
    width: "1fr",
    canBeToggled: true,
  },
  {
    label: "Gini",
    modes: ["LIST", "GRAPH"],
    tooltip:
      "A measure of inequality of income or wealth, where 100% represents complete inequality and 0% complete equality.",
    component: Cells.Gini,
    header: Headers.Gini,
    width: "1fr",
    canBeToggled: true,
  },
  {
    label: "DeleteButton",
    modes: ["LIST", "GRAPH"],
    component: Cells.DeleteButton,
    header: Headers.DeleteButton,
    width: "auto",
    canBeToggled: false,
  },
];

export interface ColumnConfig {
  label: string;
  modes: Array<"LIST" | "GRAPH">;
  tooltip?: string;
  component: (props: Cells.CellProps) => JSX.Element;
  header: (props: Headers.HeaderProps) => JSX.Element;
  width: string;
  canBeToggled: boolean;
}

export default columns;
