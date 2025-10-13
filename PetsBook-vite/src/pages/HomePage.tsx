import {Menu} from '../components/react-functions';
import type {JSX} from 'react';
import {Pet} from '../models/Pet';
import * as Func from '../components/data-loading';
import {Link} from "react-router-dom";

type PetProps = {
  pet: Pet;
};

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
      <div id="button-header">
        <div id="button-header-text">
          <h2>Beautiful pets</h2>
        </div>
        <div id="create-pet-button-div">
          <Link to={`/create-pet`}><button id='create-pet-button'>Add pet</button></Link>
        </div>
      </div>
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

export function PetInCatalog( {pet}: PetProps): JSX.Element {
  return (
    <Link to={`/pets/${pet.petId}`}>
      <div className="pet-in-catalog" id={"pet_" + pet.petId}>
        <img 
        src={Func.getPhotoUrl(pet.photoPath)} 
        onError={(e) => { e.currentTarget.src = "/default.png"; }} 
        className="pet-img" 
        alt={pet.name} 
        />
        <h4>{pet.name}</h4>
        <p>{Func.getAnimalType(pet.animalTypeId)}</p>
      </div>
    </Link>
  );
}
