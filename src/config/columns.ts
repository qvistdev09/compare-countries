const columns: ColumnConfig[] = [
  {
    label: "Flag",
    modes: ["LIST"],
  },
  {
    label: "Capital",
    modes: ["LIST"],
  },
  {
    label: "Population",
    modes: ["LIST", "GRAPH"],
  },
  {
    label: "Area",
    modes: ["LIST", "GRAPH"],
  },
  {
    label: "Demonym",
    modes: ["LIST"],
  },
  {
    label: "Gini",
    modes: ["LIST", "GRAPH"],
    tooltip:
      "A measure of inequality of income or wealth, where 100% represents complete inequality and 0% complete equality.",
  },
];

interface ColumnConfig {
  label: string;
  modes: Array<"LIST" | "GRAPH">;
  tooltip?: string;
}

export default columns;
