export function SortableHeader({ position, label, sortFunction, currentSort }: HeaderProps) {
  const className = `grid-cell header-${position}`;
  return (
    <div className={className}>
      <p className="m-right-small table-header">{label}</p>
      <i
        onClick={() => sortFunction(label, "DESC")}
        className={
          "fas fa-chevron-up sort-icon" + (currentSort.column === label ? " active-sort" : "")
        }
      />
      <i
        onClick={() => sortFunction(label, "ASC")}
        className={
          "fas fa-chevron-down sort-icon" + (currentSort.column === label ? " active-sort" : "")
        }
      />
    </div>
  );
}

export function NonSortableHeader({
  position,
  label,
}: Omit<HeaderProps, "sortFunction" | "currentSort">) {
  const className = `grid-cell header-${position}`;
  return (
    <div className={className}>
      <p className="table-header">{label}</p>
    </div>
  );
}

interface HeaderProps {
  label: string;
  sortFunction: (column: string, direction: "ASC" | "DESC") => void;
  currentSort: { column: string; direction: "ASC" | "DESC" };
  position: "left-end" | "middle" | "right-end";
}
