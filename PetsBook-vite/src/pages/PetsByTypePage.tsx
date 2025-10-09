import {Menu} from '../components/react-functions';
import type { JSX } from 'react';
import { useParams } from "react-router-dom";
import * as Func from '../components/data-loading';
import { Pet } from '../models/Pet';
import { PetInCatalog } from '../components/react-functions';

export function PetsByTypePage(): JSX.Element {
  return (
    <div id="full-page" className="App">
        <Menu />
        <PetsByAnimalTypeCatalog />
    </div>
  );
}

export function PetsByAnimalTypeCatalog(): JSX.Element  {
    const {id} = useParams<{ id: string }>();
    return (
      <section id="pets-page">
        <h2>Beautiful {Func.animals[Number(id)]}s</h2>
        <UploadPetsByTypeIntoCatalog />
      </section>
);}

function UploadPetsByTypeIntoCatalog(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  const { pets, error, loading}: { pets: Pet[], error: string | null, loading: boolean } = Func.useFetchPetsByType(id ? Number(id) : 0);
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