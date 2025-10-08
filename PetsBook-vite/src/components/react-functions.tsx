import {animals} from './data-loading';
import type { JSX } from 'react';
import { Pet } from '../models/Pet';
import { Person } from '../models/Person';
import * as Func from './data-loading';
import {PetInfoPage} from '../pages/PetInfoPage';
import { Link, useNavigate, useParams } from "react-router-dom";

type PetProps = {
  pet: Pet;
};
type PersonProps = {
  person: Person;
};
function Submenu (): JSX.Element {
  const listItems: JSX.Element[] = Object.keys(animals).map(id => (<li key={id}><Link to={`/pets-by-type/${Number(id)}`}>{animals[Number(id)]}s</Link></li>));
  return (
    <ul id="submenu-list">{listItems}</ul>
  );
}

export function Menu(): JSX.Element {
    return (
      <section id="menu">
        <h1>Pets book</h1>
        <ul id="menu-list">
            <Link to={`/`}><li>Pets Catalog</li></Link>
            <li id="no-link-menu"><a href="#">By type:</a></li>
            <Submenu />
            <Link to={`/owners`}><li>Owners</li></Link>
        </ul>
      </section>
    );
}

function PetInCatalog( {pet}: PetProps): JSX.Element {
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

function PersonInCatalog( {person}: PersonProps): JSX.Element {
  return (
    <div className="person-in-catalog" id={"person_" + person.personId}> 
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

export function UploadPetInfo(id: number): JSX.Element {
  const { petInfo, error, loading }:{ petInfo: Pet | null, error: string | null, loading: boolean } = Func.useFetchPetInfo(id);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!petInfo) return <p>Pet not found.</p>;
  return (
    <div id="pet-information">
      <h2>Beautiful {petInfo.name}</h2>
      <img 
        src={Func.getPhotoUrl(petInfo.photoPath)} 
        onError={(e) => { e.currentTarget.src = "/default.png"; }} 
        className="pet-img" 
        alt={petInfo.name} 
      />
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

export function PetInfoSection(id: number): JSX.Element {
  const { petInfo } = Func.useFetchPetInfo(id);
  return (
    <section id="pet-info-page">
      <div id="pet-info-section">
        {UploadPetInfo(id)}
        <div className="pet-info-buttons">
          <Link to={`/`}><button>Back to catalog</button></Link>
          <Link to={`/edit-pet/${id}`}><button>Edit pet</button></Link>
          {petInfo?.owner && <Link to={`/owner-details/${petInfo.owner.personId}`}><button>Owner details</button></Link>}
        </div>
      </div>
    </section>
  );
}

export function EditPetSection(id: number): JSX.Element {
  const navigate = useNavigate();
  const { petInfo, error: petError, loading: petLoading } = Func.useFetchPetInfo(id);
  const { people, error: peopleError, loading: peopleLoading } = Func.useFetchPeople();
  
  if (petLoading || peopleLoading) return <p>Loading...</p>;
  if (petError) return <p>Error loading pet: {petError}</p>;
  if (peopleError) return <p>Error loading owners: {peopleError}</p>;
  
  const breeds: JSX.Element[] = Object.keys(animals).map(id => (
    <option key={"breed_"+id} value={id}>
      {animals[Number(id)]}
    </option>
  ));
  const owners: JSX.Element[] = [
    ...people.map(person => (
      <option key={`owner_${person.personId}`} value={person.personId}>
        {person.name} {person.surname}
      </option>
    ))
  ];
  localStorage.setItem("animalPhoto", petInfo ? petInfo.photoPath || "default.png" : "default.png");
  localStorage.setItem("ownerId", petInfo ? (petInfo.ownerId ? petInfo.ownerId.toString() : "") : "");
  return (
    <section id="edit-pet-page">
        <form id="editing-pet-form" onSubmit={(e) =>Func.handleSubmit(e, id, petInfo ? petInfo.photoPath || "default.png" : "default.png", navigate)} encType="multipart/form-data">
          <h2 id="header_form_label">Editing {petInfo ? petInfo.name : "pet"}</h2><br/>
          <label>Name</label><br />
          <input type='text' name='name' defaultValue={petInfo ? petInfo.name : "pet"} required /><br/>
          <label>Breed</label><br />
          <select name="breed" defaultValue={petInfo ? petInfo.animalTypeId : 0}>
            {breeds}
          </select> <br />
          <label>Date of Birth</label><br />
          <input type='date' name='dateOfBirth' defaultValue={petInfo ? petInfo.dateOfBirth?.split("T")[0] : "unknown"}/><br/>
          <label>Owner</label><br />
          <select name='ownerId' defaultValue={petInfo?.ownerId || ''}>
            {owners}
          </select><br/>
          <label>Photo</label><br />
          <input type='file' name="photo" accept="image/*"/><br/>
          <input className="form_button" type='reset'/>
          <input className="form_button" type='submit' value='Save'/>
          </form>
    </section>
  );
}

//Форма додавати тваринку + аплоадити картинку
//Додати onClick та вікно з інформацією про owner-а + всі його тварини
//Cтилі для сторінки про власників
//Стилі для форми едітання тварини
//Якось додати пошук за власником
//Навести порядок в react-functions.tsx
//Переключення між вкладками з типами тварин - не відбувається
//Додати кнопку cancel при едітанні тварини
//Додати кнопку про власника при перегляді тварини???
//Стилізувати кнопку для завантажування фотоі