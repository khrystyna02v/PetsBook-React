import {Menu} from '../components/Menu';
import * as Handlers from '../components/handlers';
import * as FetchFunctions from '../components/fetch-functions';
import * as PetUtils from '../components/pet-utils';
import { useParams, useNavigate } from "react-router-dom";
import type { JSX } from 'react';
import { Link } from "react-router-dom";
import { Pet } from '../models/Pet';
import { Person } from '../models/Person';
import { Prediction } from '../models/Prediction';

type PetProps = {
  pet: Pet;
};

type OwnerInfoProps = {
  personInfo: Person;
  pets: Pet[];
  predictions: Prediction[];
};

export function OwnerInfoPage(): JSX.Element {
  const {name, surname} = useParams<{ name: string, surname: string }>();
  const navigate = useNavigate();

  const { personInfo, error: personError, loading: personLoading }:{ personInfo: Person | null, error: string | null, loading: boolean } = FetchFunctions.useFetchOwnerInfo(String(name), String(surname));
  const { pets, error: petsError, loading: petsLoading }:{ pets: Pet[], error: string | null, loading: boolean } = FetchFunctions.useFetchPetsByOwner(personInfo ? personInfo.personId || 1 : 1);
  const { predictions, error: predictionsError, loading: predictionsLoading }:{ predictions: Prediction[] | null, error: string | null, loading: boolean } = FetchFunctions.useFetchOriginPredictions(personInfo ? personInfo.personId || 1 : 1);

  const handleDelete = async () => {
    if (pets.length > 0) {
      alert('Cannot delete person with pets. Please remove or transfer all pets first.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this person?')) {
      await Handlers.handleDeletePerson(String(name), String(surname), navigate);
    }
  };

  const isDisabled = pets.length > 0;
  const deleteButtonClass = `delete-button ${isDisabled ? 'delete-button-disabled' : ''}`;
  const deleteButtonTitle = isDisabled ? "Cannot delete person with pets" : "Delete this person";

  if (personLoading) return <p>Loading person...</p>;
  if (personError) return <p>Error loading person: {personError}</p>;
  if (!personInfo) return <p>Person not found.</p>;
  if (predictionsLoading) return <p>Loading origin predictions...</p>;
  if (predictionsError) return <p>Error loading origin predictions: {predictionsError}</p>;
  if (petsLoading) return <p>Loading pets...</p>;
  if (petsError) return <p>Error loading pets: {petsError}</p>;

  return (
    <div id="full-page" className="App">
      <Menu />
      <section id="pet-info-page">
        <div id="pet-info-section">
          <UploadOwnerInfo personInfo={personInfo} pets={pets} predictions={predictions} />
          <Link to={`/owners`}><button className="pet-info-section-button">Owners catalog</button></Link>
          <Link to={`/edit-person/${name}/${surname}`}><button className="pet-info-section-button">Edit person</button></Link>
          <button className={deleteButtonClass} id="del-person-button" title={deleteButtonTitle} onClick={handleDelete} disabled={pets.length > 0}>Delete person</button>
        </div>
      </section>
    </div>
  );
}

function UploadOwnerInfo({ personInfo, pets, predictions }: OwnerInfoProps): JSX.Element {
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
        src={PetUtils.getPhotoUrl(pet.photoPath)} 
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