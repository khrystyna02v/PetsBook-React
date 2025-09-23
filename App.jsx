function App() {
  return (
    <div id="page" className="App">
    <Menu />
    <PetsCatalog />
    </div>
  );
}

const container = document.getElementById('container');
const root = ReactDOM.createRoot(container);
root.render(<App />);