import {Menu} from '../components/Menu';
import * as FetchFunctions from '../components/fetch-functions';
import type { JSX } from 'react';
import { useParams } from "react-router-dom";
import * as Func from '../components/pet-utils';
import { Pet } from '../models/Pet';
import { PetInCatalog } from './HomePage';
import { Link } from "react-router-dom";

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
        <div id="button-header">
          <div id="button-header-text">
            <h2>Beautiful {Func.animals[Number(id)]}s</h2>
          </div>
          <div id="create-pet-button-div">
            <Link to={`/create-pet`}><button id='create-pet-button'>Add pet</button></Link>
          </div>
        </div>
        <UploadPetsByTypeIntoCatalog />
      </section>
);}

function UploadPetsByTypeIntoCatalog(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  const { pets, error, loading}: { pets: Pet[], error: string | null, loading: boolean } = FetchFunctions.useFetchPetsByType(id ? Number(id) : 0);
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