import "./styles/utilities.css";
import "./styles/style.css";
import CheckboxPanel from "./components/CheckboxPanel";

function App() {
  return (
    <div>
      compare countries
      <CheckboxPanel
        checkboxes={[
          {
            enabled: true,
            label: "Test",
            onClick: () => {},
            checked: false,
            tooltip: "Något intressant",
          },
        ]}
      />
    </div>
  );
}

export default App;
