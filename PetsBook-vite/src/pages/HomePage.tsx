import {Menu} from '../components/react-functions';
import type {JSX} from 'react';
import {Pet} from '../models/Pet';
import * as Func from '../components/data-loading';
import {PetInCatalog} from '../components/react-functions';

export function HomePage(): JSX.Element {
  return (
    <div id="full-page" className="App">
        <Menu />
        <PetsCatalog />
    </div>
  );
}

function PetsCatalog(): JSX.Element  {
  return (
    <section id="pets-page">
      <h2>Beautiful pets</h2>
      <UploadPetsIntoCatalog />
    </section>
);}

function UploadPetsIntoCatalog(): JSX.Element {
  const { pets, error, loading}: { pets: Pet[], error: string | null, loading: boolean } = Func.useFetchPets();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pets.length) return <p>No pets found</p>;
  return (
    <div id="pets-catalog">
      {pets.map((p, idx) => (
        <PetInCatalog pet={p} key={idx}/>
      ))}
    </div>
  );
}
