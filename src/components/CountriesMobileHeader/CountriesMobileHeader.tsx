import { useState } from "react";
import columns from "../../config/columns";

export default function CountriesMobileHeader({ currentSort, sortFunction }: Props) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <>
      <div key="mobile-header-left" className="MobileDataHeader-cell MobileDataHeader-left">
        <p className="MobileDataHeader-label">Sort mode:</p>
      </div>
      <div key="mobile-header-right" className="MobileDataHeader-cell MobileDataHeader-right">
        <div className="MobileDataHeader-sort-container flex-row align-center justify-between">
          <p
            className="MobileDataHeader-sort-mode grow"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            {currentSort.column}
          </p>
          <div className="flex-row align-center">
            <i
              onClick={() => sortFunction(currentSort.column, "ASC")}
              key="sort-ascending-false"
              className={
                "fas fa-chevron-up sort-icon" +
                (currentSort.direction === "ASC" ? " active-sort" : "")
              }
            ></i>
            <i
              onClick={() => sortFunction(currentSort.column, "DESC")}
              key="sort-ascending-true"
              className={
                "fas fa-chevron-down sort-icon" +
                (currentSort.direction === "DESC" ? " active-sort" : "")
              }
            ></i>
          </div>
          <div
            className={"MobileDataHeader-sort-choices-container" + (showDropdown ? "" : " hide")}
          >
            {columns
              .filter((column) => column.sortable)
              .map((column) => (
                <p
                  key={column.label}
                  className="MobileDataHeader-sort-mode-choice"
                  onClick={() => sortFunction(column.label, currentSort.direction)}
                >
                  {column.label}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

interface Props {
  sortFunction: (label: string, direction: "ASC" | "DESC") => void;
  currentSort: {
    column: string;
    direction: "ASC" | "DESC";
  };
}
