import "./styles/utilities.css";
import "./styles/style.css";
import SearchField from "./components/SearchField";

function App() {
  return (
    <div>
      <SearchField onCountryAdd={() => {}} selectedCountriesCodes={[]} />
      <div style={{marginTop: '10rem'}}>
        <p>test</p>
      </div>
    </div>
  );
}

export default App;
