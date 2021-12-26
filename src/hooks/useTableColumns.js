import { useState } from "react";

const useTableColumns = (defaultTableColumns) => {
  const [columns, setColumns] = useState(defaultTableColumns);

  const toggleColumn = (name) => {
    setColumns((prevState) =>
      prevState.map((columnObj) => {
        if (columnObj.value !== name) {
          return columnObj;
        }
        return { ...columnObj, enabled: !columnObj.enabled };
      })
    );
  };

  return {
    columns,
    toggleColumn,
  };
};

export default useTableColumns;
