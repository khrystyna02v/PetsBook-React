import {animals} from './data-loading';
import type { JSX } from 'react';
import { Pet } from './Pet';
import { Person } from './Person';
import * as Func from './data-loading';
import {PetInfoPage} from './PetInfo';

type PetProps = {
  pet: Pet;
};
type PersonProps = {
  person: Person;
};
function Submenu (): JSX.Element {
  const listItems: JSX.Element[] = Object.keys(animals).map(id => (<li key={id} onClick={() => {localStorage.setItem("animalType", id); window.location.href="pets-by-animal-type.html"}}>{animals[Number(id)]}s</li>));
  return (
    <ul id="submenu-list">{listItems}</ul>
  );
}

export function Menu(): JSX.Element {
    return (
      <section id="menu">
        <h1>Pets book</h1>
        <ul id="menu-list">
            <li><a href="index.html">Pets Catalog</a></li>
            <li id="no-link-menu"><a href="#">By type:</a></li>
            <Submenu />
            <li><a href="owners.html">Owners</a></li>
        </ul>
      </section>
    );
}

function PetInCatalog( {pet}: PetProps): JSX.Element {
  return (
    <div className="pet-in-catalog" id={"pet_" + pet.petId} onClick={() => {localStorage.setItem("petId", pet.petId ? pet.petId.toString() : ""); window.location.href = "pet-info.html";}}>
      <img src={pet.photoPath || "default.png"} onError={(e) => { e.currentTarget.src = "default.png"; }} className="pet-img" alt={pet.name} />
      <h4>{pet.name}</h4>
      <p>{Func.getAnimalType(pet.animalTypeId)}</p>
    </div>
  );
}

function PersonInCatalog( {person}: PersonProps): JSX.Element {
  return (
    <div className="person-in-catalog" id={"person_" + person.personId}> 
      {/* onClick={() => {localStorage.setItem("petId", pet.petId ? pet.petId.toString() : ""); window.location.href = "pet-info.html";}}> */}
      <img src="default-owner.png" alt={person.name+" "+person.surname} />
      <div className="person-in-catalog-text">
        <h4>{person.name} {person.surname}</h4>
        <p>{person.phoneNumber}</p>
      </div>
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

function UploadPetsByTypeIntoCatalog(): JSX.Element {
  const animalType: number = Number(localStorage.getItem("animalType"));
  const { pets, error, loading}: { pets: Pet[], error: string | null, loading: boolean } = Func.useFetchPetsByType(animalType);
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

function UploadPeopleIntoCatalog(): JSX.Element {
  const { people, error, loading}: { people: Person[], error: string | null, loading: boolean } = Func.useFetchPeople();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!people.length) return <p>No owners found</p>;
  return (
    <div id="owners-catalog">
      {people.map((p, idx) => (
        <PersonInCatalog person={p} key={idx}/>
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

  export function PetsByAnimalTypeCatalog(): JSX.Element  {
  return (
    <section id="pets-page">
      <h2>Beautiful {animals[Number(localStorage.getItem("animalType"))]}s</h2>
      <UploadPetsByTypeIntoCatalog />
    </section>
  );}

export function OwnersCatalog(): JSX.Element  {
  return (
    <section id="owners-page">
      <h2>Beautiful owners</h2>
      <UploadPeopleIntoCatalog />
    </section>
  );}

function UploadPetInfo(): JSX.Element {
  const { petInfo, error, loading }:{ petInfo: Pet, error: string | null, loading: boolean } = Func.useFetchPetInfo();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  //if (!petInfo.length) return <p>Pet not found.</p>;
  return (
    <div id="pet-information">
      <h2>Beautiful {petInfo.name}</h2>
      <img src={petInfo.photoPath || "default.png"} onError={(e) => { e.currentTarget.src = "default.png"; }} className="pet-img" alt={petInfo.name}  />
      <div id="text-pet-info">
        <p>Name: {petInfo.name}</p>
        <p>Breed: {Func.getAnimalType(petInfo.animalTypeId)}</p>
        <p>Date of birth: {petInfo.dateOfBirth?.split("T")[0]}</p>
        <p>Owner: {petInfo.owner != undefined ? petInfo.owner.name + " " + petInfo.owner.surname : "No owner"}</p>
        <p>{petInfo.owner != undefined ? (petInfo.owner.home != undefined ? `Home: ${petInfo.owner.home.street} ${petInfo.owner.home.building}${petInfo.owner.home.apartment != null ? "/"+petInfo.owner.home.apartment : ""}, ${petInfo.owner.home.city}, ${petInfo.owner.home.country}` : "") : ""}</p>
      </div>
    </div>
  );
}

export function PetInfoSection(): JSX.Element {
  return (
    <section id="pet-info-page">
      <div id="pet-info-section">
        <UploadPetInfo />
        <button onClick={() => {window.location.href = "index.html";}}>Back to catalog</button>
        <button onClick={() => {window.location.href = "owner-info.html";}}>Owner details</button>
        <button onClick={() => {window.location.href = "edit-pet.html";}}>Edit pet</button>
      </div>
    </section>
  );
}

function SwitchPage(petId: number|undefined, ref: string): void {
  localStorage.setItem("petId", petId ? petId.toString() : "");
  window.location.href = ref;
}

export function EditPetSection(): JSX.Element {
  const { petInfo, error, loading }:{ petInfo: Pet, error: string | null, loading: boolean } = Func.useFetchPetInfo();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const breeds: JSX.Element[] = Object.keys(animals).map(id => (
    <option key={id} value={id}>
      {animals[Number(id)]}
    </option>
  ));
  localStorage.setItem("animalPhoto", petInfo.photoPath || "default.png");
  localStorage.setItem("ownerId", petInfo.ownerId ? petInfo.ownerId.toString() : "");
  return (
    <section id="edit-pet-page">
      <form id="editing-pet-form" onSubmit={Func.handleSubmit} encType="multipart/form-data">
        <label>Name</label>
        <input type='text' name='name' defaultValue={petInfo.name} required /><br/>
        <label>Breed</label>
        <select name="breed" defaultValue={petInfo.animalTypeId}>
          {breeds}
        </select> <br />
        <label>Date of Birth</label>
        <input type='date' name='dateOfBirth' defaultValue={petInfo.dateOfBirth?.split("T")[0]}/><br/>
        <label>Owner</label>
        <input type='text'/><br/>
        <label>Photo</label>
        <input type='file' name="photo" accept="image/*"/><br/>
        <input type='reset'/>
        <input type='submit' value='Save'/>
        </form>
    </section>
  );
}

//Змінити url під різні вкладки by-animal-type та pet-info
//Форма додавати тваринку + аплоадити картинку
//Додати owner та photo в едітанні тварини
//Додати onClick та вікно з інформацією про owner-а
//Сторінка з інформацією про власника + всі його тварини
//Cтилі для сторінки про власників
//Стилі для форми едітання тварини
//Якось додати пошук за власником
//Навести порядок в файлах main- та тим що вони рендерять
//Навести порядок в react-functions.tsx
//Посортувати по папках