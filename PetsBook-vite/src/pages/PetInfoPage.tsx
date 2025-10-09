import {Menu} from '../components/react-functions';
import ReactDOM from 'react-dom/client';
import { useParams } from "react-router-dom";
import type { JSX } from 'react';
import { Link } from "react-router-dom";
import * as Func from '../components/data-loading';
import { Pet } from '../models/Pet';

export function PetInfoPage(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  var name: String = localStorage.getItem("ownerName") || "";
  var surname: String = localStorage.getItem("ownerSurname") || "";
  return (
    <div id="full-page" className="App">
      <Menu />
        <section id="pet-info-page">
          <div id="pet-info-section">
            {UploadPetInfo(Number(id))}
            <Link to={`/`}><button>Pets catalog</button></Link>
            <Link to={`/owners/${name}/${surname}`}><button>Owner details</button></Link>
            <Link to={`/edit-pet/${id}`}><button>Edit pet</button></Link>
          </div>
        </section>
    </div>
  );
}

function UploadPetInfo(id: number): JSX.Element {
  const { petInfo, error, loading }:{ petInfo: Pet | null, error: string | null, loading: boolean } = Func.useFetchPetInfo(id);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!petInfo) return <p>Pet not found.</p>;
  localStorage.setItem("ownerName", petInfo.owner ? (petInfo.owner.name || "") : "");
  localStorage.setItem("ownerSurname", petInfo.owner ? (petInfo.owner.surname || "") : "");
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