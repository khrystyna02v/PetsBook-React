import {Menu} from '../components/Menu';
import * as PetsHandler from '../button-handlers/buttonhandlers-pets';
import * as FetchPets from '../api-fetch-functions/fetch-pets';
import * as FetchPeople from '../api-fetch-functions/fetch-people';
import * as PetUtils from '../components/pet-utils';
import type { JSX } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function EditPetPage(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  return (
    <div id="full-page" className="App">
    <Menu />
    {EditPetSection(Number(id))}
    </div>
  );
}

function EditPetSection(id: number): JSX.Element {
  const navigate = useNavigate();
  const { petInfo, error: petError, loading: petLoading } = FetchPets.useFetchPetInfo(id);
  const { people, error: peopleError, loading: peopleLoading } = FetchPeople.useFetchPeople();
  
  if (petLoading || peopleLoading) return <p>Loading...</p>;
  if (petError) return <p>Error loading pet: {petError}</p>;
  if (peopleError) return <p>Error loading owners list: {peopleError}</p>;
  
  const breeds: JSX.Element[] = Object.keys(PetUtils.animals)
  .filter(id => !isNaN(Number(id)))
  .map(id => (
    <option key={"breed_"+id} value={id}>
      {PetUtils.animals[Number(id)]}
    </option>
  ));
  const owners: JSX.Element[] = [
    ...people.map(person => (
      <option key={`owner_${person.personId}`} value={person.personId}>
        {person.name} {person.surname}
      </option>
    ))
  ];
  return (
    <section id="edit-pet-page">
        <form id="editing-pet-form" onSubmit={(e) =>PetsHandler.handleSubmitPetEdit(e, id, petInfo ? petInfo.photoPath || "default.png" : "default.png", navigate)} encType="multipart/form-data">
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