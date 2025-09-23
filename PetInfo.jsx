function PetInfoPage() {
  return (
    <div id="full-page" className="App">
    <Menu />
    {/* <PetInfoSection /> */}
    </div>
  );
}

const container = document.getElementById('container');
const root = ReactDOM.createRoot(container);
root.render(<PetInfoPage />);