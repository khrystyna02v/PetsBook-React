import {Menu} from '../components/react-functions';
import { useParams } from "react-router-dom";
import type { JSX } from 'react';
import { Link } from "react-router-dom";
import * as Func from '../components/data-loading';
import { Pet } from '../models/Pet';
import { Person } from '../models/Person';
import { Prediction } from '../models/Prediction';

type PetProps = {
  pet: Pet;
};

export function OwnerInfoPage(): JSX.Element {
  const {name, surname} = useParams<{ name: string, surname: string }>();
  return (
    <div id="full-page" className="App">
      <Menu />
      <section id="pet-info-page">
        <div id="pet-info-section">
          {UploadOwnerInfo(String(name), String(surname))}
          <Link to={`/owners`}><button>Owners catalog</button></Link>
          <Link to={`/edit-person/${name}/${surname}`}><button>Edit person</button></Link>
          {/* <button className="delete-button">Delete person</button> */}
        </div>
      </section>
    </div>
  );
}

function UploadOwnerInfo(name: String, surname: String): JSX.Element {
  const { personInfo, error: personError, loading: personLoading }:{ personInfo: Person | null, error: string | null, loading: boolean } = Func.useFetchOwnerInfo(name, surname);
  const { pets, error: petsError, loading: petsLoading }:{ pets: Pet[], error: string | null, loading: boolean } = Func.useFetchPetsByOwner(personInfo ? personInfo.personId || 1 : 1);
  const { predictions, error: predictionsError, loading: predictionsLoading }:{ predictions: Prediction[] | null, error: string | null, loading: boolean } = Func.useFetchOriginPredictions(personInfo ? personInfo.personId || 1 : 1);
  if (personLoading) return <p>Loading person...</p>;
  if (personError) return <p>Error loading person: {personError}</p>;
  if (!personInfo) return <p>Person not found.</p>;
  if (predictionsLoading) return <p>Loading origin predictions...</p>;
  if (predictionsError) return <p>Error loading origin predictions: {predictionsError}</p>;
  if (petsLoading) return <p>Loading pets...</p>;
  if (petsError) return <p>Error loading pets: {petsError}</p>;
  return (
    <div id="person-information">
      <h2 id="h2-person-name">Beautiful {personInfo.name}</h2>
      <div id="text-owner-info">
        <p>Name: {personInfo.name}</p>
        <p>Surname: {personInfo.surname}</p>
        <p>Phone number: {personInfo.phoneNumber}</p>
        <p>{personInfo.email != undefined ? `Email: ${personInfo.email}` : ""}</p>
        <p>Date of birth: {personInfo.dateOfBirth?.split("T")[0]}</p>
        <p>{personInfo.home != undefined ? `Home: ${personInfo.home.street} str. ${personInfo.home.building}${personInfo.home.apartment != null ? "/"+personInfo.home.apartment : ""}, ${personInfo.home.city}, ${personInfo.home.country}` : ""}</p>
        <p id="pets-by-owner-title">{pets.length > 0 ? `Pets:` : "No pets yet."}</p>
        <div id="pets-by-owner">
          {pets.map((p, idx) => (
            <PetByOwner pet={p} key={idx}/>
          ))}
        </div>
        <p>{predictions.length > 0 ? `Predictions of origin (based on name):` : "Can not predict origin country"}</p>
        <>
          {predictions.map((prediction, idx) => (
            <p key={idx}>{prediction.country_name} ({Math.round(prediction.probability ? prediction.probability*100 : 0)}%)</p>
          ))}
        </>
      </div>
    </div>
  );
}

function PetByOwner( {pet}: PetProps): JSX.Element {
  return (
    <Link to={`/pets/${pet.petId}`}>
      <div className="pet-by-owner" id={"pet_" + pet.petId}>
        <img 
        src={Func.getPhotoUrl(pet.photoPath)} 
        onError={(e) => { e.currentTarget.src = "/default.png"; }} 
        className="pet-by-owner-img" 
        alt={pet.name} 
      />
        <h4>{pet.name}</h4>
        <p>{pet.animalType}</p>
      </div>
    </Link>
  );
}