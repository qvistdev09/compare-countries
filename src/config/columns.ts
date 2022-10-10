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
    sortable: true,
    renderInMobileList: true,
  },
  {
    label: "Flag",
    modes: ["LIST"],
    component: Cells.Flag,
    header: Headers.Flag,
    width: "1fr",
    canBeToggled: true,
    sortable: false,
    renderInMobileList: false,
  },
  {
    label: "Capital",
    modes: ["LIST"],
    component: Cells.Capital,
    header: Headers.Capital,
    width: "1fr",
    canBeToggled: true,
    sortable: true,
    renderInMobileList: true,
  },
  {
    label: "Population",
    modes: ["LIST", "GRAPH"],
    component: Cells.Population,
    header: Headers.Population,
    width: "1fr",
    canBeToggled: true,
    sortable: true,
    format: "population",
    renderInMobileList: true,
  },
  {
    label: "Area",
    modes: ["LIST", "GRAPH"],
    component: Cells.Area,
    header: Headers.Area,
    width: "1fr",
    canBeToggled: true,
    sortable: true,
    format: "area",
    renderInMobileList: true,
  },
  {
    label: "Demonym",
    modes: ["LIST"],
    component: Cells.Demonym,
    header: Headers.Demonym,
    width: "1fr",
    canBeToggled: true,
    sortable: true,
    renderInMobileList: true,
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
    sortable: true,
    format: "gini",
    renderInMobileList: true,
  },
  {
    label: "DeleteButton",
    modes: [],
    component: Cells.DeleteButton,
    header: Headers.DeleteButton,
    width: "auto",
    canBeToggled: false,
    sortable: false,
    renderInMobileList: false,
  },
];

export type Format = "population" | "area" | "gini";

export interface ColumnConfig {
  label: string;
  modes: Array<"LIST" | "GRAPH">;
  tooltip?: string;
  component: (props: Cells.CellProps) => JSX.Element;
  header: (props: Headers.HeaderProps) => JSX.Element;
  width: string;
  canBeToggled: boolean;
  sortable: boolean;
  format?: Format;
  renderInMobileList: boolean;
}

export default columns;
