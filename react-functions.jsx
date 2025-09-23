function Menu() {
    return (
      <section id="menu">
        <h1>Pets book</h1>
        <ul>
            <li>Pets</li>
            <li>People</li>
            <li>Predictions</li>
        </ul>
      </section>
    );
}

function PetInCatalog({ pet }) {
  return (
    <div className="pet-in-catalog" id={"pet_" + pet.petId}>
      <img height="100px" width="100px" src={pet.photoPath} alt={pet.name} />
      <h4>{pet.name}</h4>
      <p>{getAnimalType(pet.animalTypeId)}</p>
    </div>
  );
}

function UploadPetsIntoCatalog() {
  const [pets, setPets] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let mounted = true;
    fetch(`${CONFIG.apiUrl}/api/Pets/list`)
      .then(res => {
        if (!res.ok) throw new Error("HTTP error " + res.status);
        return res.json();
      })
      .then(data => {
        if (!mounted) return;

        const list = Array.isArray(data) ? data : (data.items || data.pets || []);
        setPets(list);
      })
      .catch(err => {
        console.error(err);
        if (mounted) setError(err.message || "Fetch error");
      });
    return () => { mounted = false; };
  }, []);

  if (error) return <div>Loading error: {error}</div>;
  if (pets === null) return <div>Loading...</div>;
  if (pets.length === 0) return <div>No pets available</div>;

  return (
    <div>
      {pets.map((p, idx) => (
        <PetInCatalog key={p.PetId ?? p.petId ?? p.id ?? idx} pet={p} />
      ))}
    </div>
  );
}

function PetsCatalog() {
  return (
    <section id="pets-page">
      <h2>Beautiful pets</h2>
      <div className="pets-catalog">
        <UploadPetsIntoCatalog />
      </div>
    </section>
  );}





// PetInCatalog - додати альтернативне зображення/текст || ..