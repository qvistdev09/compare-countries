import columns from "../../config/columns";

export default function CountryGraphHeader({ currentSort, sortAction, activeColumns }: Props) {
  const activeGraphColumns = columns.filter(
    (column) => column.modes.includes("GRAPH") && activeColumns.includes(column.label)
  );
  const gridTemplateColumns = activeGraphColumns.map(() => "1fr").join(" ");

  return (
    <>
      <div className="grid-cell header-left-end">
        <p className="table-header m-right-small">Name</p>
        <i
          onClick={() => sortAction("Name", "ASC")}
          key="sort-ascending-false"
          className={
            "fas fa-chevron-up sort-icon" +
            (currentSort.column === "Name" && currentSort.direction === "ASC" ? " active-sort" : "")
          }
        />
        <i
          onClick={() => sortAction("Name", "DESC")}
          key="sort-ascending-true"
          className={
            "fas fa-chevron-down sort-icon" +
            (currentSort.column === "Name" && currentSort.direction === "DESC"
              ? " active-sort"
              : "")
          }
        />
      </div>
      <div className="header-middle" style={{ display: "grid", gridTemplateColumns }}>
        {activeGraphColumns.map((graphHeader) => (
          <div key={graphHeader.label} className="grid-cell">
            <div
              className="table-header-graph m-right-small"
              style={{ backgroundColor: graphHeader.graphColor }}
            />
            <p className="table-header">{graphHeader.label}</p>
            <i
              onClick={() => sortAction(graphHeader.label, "ASC")}
              className={
                "fas fa-chevron-up sort-icon" +
                (currentSort.column === graphHeader.label && currentSort.direction === "ASC"
                  ? " active-sort"
                  : "")
              }
            />
            <i
              onClick={() => sortAction(graphHeader.label, "DESC")}
              className={
                "fas fa-chevron-down sort-icon" +
                (currentSort.column === graphHeader.label && currentSort.direction === "DESC"
                  ? " active-sort"
                  : "")
              }
            />
          </div>
        ))}
      </div>
      <div key="graph-header-cell-delete" className="grid-cell header-right-end"></div>
    </>
  );
}

interface Props {
  sortAction: (column: string, direction: "ASC" | "DESC") => void;
  currentSort: { column: string; direction: "ASC" | "DESC" };
  activeColumns: string[];
}
