import {Menu} from '../components/Menu';
import * as Handlers from '../components/handlers';
import * as FetchFunctions from '../components/fetch-functions';
import * as PetUtils from '../components/pet-utils';
import { useParams } from "react-router-dom";
import type { JSX } from 'react';
import { Link } from "react-router-dom";
import { Pet } from '../models/Pet';
import { useNavigate } from "react-router-dom";

export function PetInfoPage(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  var name: String = localStorage.getItem("ownerName") || "";
  var surname: String = localStorage.getItem("ownerSurname") || "";
  const navigate = useNavigate();
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this pet?')) {
      await Handlers.handleDeletePet(Number(id), navigate);
    }
  };
  return (
    <div id="full-page" className="App">
      <Menu />
        <section id="pet-info-page">
          <div id="pet-info-section">
            {UploadPetInfo(Number(id))}
            <Link to={`/`}><button className="pet-info-section-button">Pets catalog</button></Link>
            <Link to={`/owners/${name}/${surname}`}><button className="pet-info-section-button">Owner details</button></Link>
            <Link to={`/edit-pet/${id}`}><button className="pet-info-section-button">Edit pet</button></Link>
            <button className="delete-button" onClick={handleDelete}>Delete pet</button>
          </div>
        </section>
    </div>
  );
}

function UploadPetInfo(id: number): JSX.Element {
  const { petInfo, error, loading }:{ petInfo: Pet | null, error: string | null, loading: boolean } = FetchFunctions.useFetchPetInfo(id);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!petInfo) return <p>Pet not found.</p>;
  localStorage.setItem("ownerName", petInfo.owner ? (petInfo.owner.name || "") : "");
  localStorage.setItem("ownerSurname", petInfo.owner ? (petInfo.owner.surname || "") : "");
  return (
    <div id="pet-information">
      <h2>Beautiful {petInfo.name}</h2>
      <img 
        src={PetUtils.getPhotoUrl(petInfo.photoPath)} 
        onError={(e) => { e.currentTarget.src = "/default.png"; }} 
        className="pet-img" 
        alt={petInfo.name} 
      />
      <div id="text-pet-info">
        <p>Name: {petInfo.name}</p>
        <p>Breed: {PetUtils.getAnimalType(petInfo.animalTypeId)}</p>
        <p>Date of birth: {petInfo.dateOfBirth?.split("T")[0]}</p>
        <p>Owner: {petInfo.owner != undefined ? petInfo.owner.name + " " + petInfo.owner.surname : "No owner"}</p>
        <p>{petInfo.owner != undefined ? (petInfo.owner.home != undefined ? `Home: ${petInfo.owner.home.street} str. ${petInfo.owner.home.building}${petInfo.owner.home.apartment != null ? "/"+petInfo.owner.home.apartment : ""}, ${petInfo.owner.home.city}, ${petInfo.owner.home.country}` : "") : ""}</p>
      </div>
    </div>
  );
}