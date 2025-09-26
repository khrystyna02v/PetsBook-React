import {animals} from './data-loading';
import type { JSX } from 'react';
import { Pet } from './Pet';
import * as Func from './data-loading';

type PetProps = {
  pet: Pet;
};

function Submenu (): JSX.Element {
  const listItems: JSX.Element[] = animals.map(a => <li key={a}>{a}</li>);
  return (
    <ul id="submenu-list">{listItems}</ul>
  );
}

export function Menu(): JSX.Element {
    return (
      <section id="menu">
        <h1>Pets book</h1>
        <ul id="menu-list">
            <li>Pets Catalog</li>
            <li>By type:</li>
            <Submenu />
            <li>Owners</li>
        </ul>
      </section>
    );
}

function PetInCatalog( {pet}: PetProps): JSX.Element {
  return (
    <div className="pet-in-catalog" id={"pet_" + pet.petId}>
      <img src={pet.photoPath || "default.png"} onError={(e) => { e.currentTarget.src = "default.png"; }} className="pet-img" alt={pet.name} />
      <h4>{pet.name}</h4>
      <p>{Func.getAnimalType(pet.animalTypeId)}</p>
    </div>
  );
}

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

export function PetsCatalog(): JSX.Element  {
  return (
    <section id="pets-page">
      <h2>Beautiful pets</h2>
      <UploadPetsIntoCatalog />
    </section>
  );}

function UploadPetInfo(): JSX.Element {
  const { petInfo, error, loading }:{ petInfo: Pet, error: string | null, loading: boolean } = Func.useFetchPetInfo();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  //if (!petInfo.length) return <p>Pet not found.</p>;
  return (
    <div id="pet-information">
      <img src={petInfo.photoPath || "default.png"} onError={(e) => { e.currentTarget.src = "default.png"; }} className="pet-img" alt={petInfo.name}  />
      <p>Name: {petInfo.name}</p>
      <p>Breed: {Func.getAnimalType(petInfo.animalTypeId)}</p>
      <p>Date of birth: {petInfo.dateOfBirth}</p>
      <p>Owner: {petInfo.owner != undefined ? petInfo.owner.name + " " + petInfo.owner.surname : "No owner"}</p>
    </div>
  );
}

export function PetInfoSection(): JSX.Element {
  return (
    <section id="pet-info-page">
      <div id="pet-info-section">
        <UploadPetInfo />
      </div>
    </section>
  );
}

//function SwitchPage

//Сторінка тварини - інформація про неї
//Сторінки під кожен вид тварини
//Форма додавати тваринку + аплоадити картинку
//Форма щоб едітати тваринку
//Власники тварин - якось підтягнути тварин?
//Якось додати пошук за власником