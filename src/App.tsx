import "./styles/utilities.css";
import "./styles/style.css";
import AppTitle from "./components/AppTitle";
import ViewModeSwitch from "./components/ViewModeSwitch";
import { useState } from "react";
import SearchField from "./components/SearchField";
import CheckboxPanel from "./components/CheckboxPanel";
import useColumns from "./hooks/useColumns";
import useSelectCountries from "./hooks/useSelectCountries";

function App() {
  const [viewMode, setViewMode] = useState<"LIST" | "GRAPH">("LIST");
  const { selectCountryByCode } = useSelectCountries();
  const { columnCheckboxes } = useColumns(viewMode);

  function toggleViewMode() {
    setViewMode(viewMode === "GRAPH" ? "LIST" : "GRAPH");
  }

  return (
    <div id="site-container">
      {/* TO DO: Error modal*/}
      <header id="site-header" className="p-small screen-small-p">
        <div className="flex-column screen-small-flex-row screen-small-justify-between screen-small-align-center screen-small-m-bottom">
          <AppTitle />
          <div className="flex-row-reverse screen-small-flex-row screen-small-align-center">
            <ViewModeSwitch currentMode={viewMode} onClick={toggleViewMode} />
            <SearchField selectedCountriesCodes={[]} onCountryAdd={selectCountryByCode} />
          </div>
        </div>
        <CheckboxPanel checkboxes={columnCheckboxes} />
      </header>
    </div>
  );
}

export default App;
