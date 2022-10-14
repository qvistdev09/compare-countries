import './styles/utilities.css';
import './styles/style.css';
import AppTitle from './components/AppTitle';
import ViewModeSwitch from './components/ViewModeSwitch';
import { useState } from 'react';
import SearchField from './components/SearchField';
import CheckboxPanel from './components/CheckboxPanel';
import useColumns from './hooks/useColumns';
import useSelectCountries from './hooks/useSelectCountries';
import useWatchSizeInRem from './hooks/useWatchSize';
import CountriesTable from './components/CountriesTable';
import useSortedCountries from './hooks/useSortedCountries';
import useMediaQuery from './hooks/useMediaQuery';
import CountriesGraph from './components/CountriesGraph';
import Footer from './components/Footer';

function App() {
  const [viewMode, setViewMode] = useState<'LIST' | 'GRAPH'>('LIST');
  const { selectCountryByCode, selectedCountries, removeCountryByCode } = useSelectCountries();
  const { sortedCountries, setSort, currentSort } = useSortedCountries('Name', 'ASC', selectedCountries);
  const { columnCheckboxes, checkedColumns, toggleColumn } = useColumns(viewMode);
  const headerSize = useWatchSizeInRem('site-header', 10);
  const isMobile = useMediaQuery('(max-width: 599px)');

  function toggleViewMode() {
    setViewMode(viewMode === 'GRAPH' ? 'LIST' : 'GRAPH');
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
      <main id="content-container" className="flex-column" style={{ paddingTop: headerSize + 'rem' }}>
        <div
          id="grid-wrapper"
          className="p-left-small p-top-small p-right-small screen-small-p-left screen-small-p-top screen-small-p-right flex-column align-stretch grow"
        >
          {viewMode === 'LIST' && (
            <CountriesTable
              activeColumns={checkedColumns}
              selectedCountries={sortedCountries}
              sortFunction={setSort}
              currentSort={currentSort}
              deleteFunction={removeCountryByCode}
              isMobile={isMobile}
            />
          )}
          {viewMode === 'GRAPH' && (
            <CountriesGraph
              activeColumns={checkedColumns}
              selectedCountries={sortedCountries}
              currentSort={currentSort}
              deleteAction={removeCountryByCode}
              sortAction={setSort}
              isMobile={isMobile}
              toggleColumn={toggleColumn}
            />
          )}
          <div className="grow" />
          <Footer />
        </div>
      </main>
    </div>
  );
}

export default App;
