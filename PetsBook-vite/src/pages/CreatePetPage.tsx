import {Menu} from '../components/Menu';
import * as PetsHandler from '../button-handlers/buttonhandlers-pets';
import * as FetchPeople from '../api-fetch-functions/fetch-people';
import * as PetUtils from '../components/pet-utils';
import type { JSX } from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export function CreatePetPage(): JSX.Element {
  return (
    <div id="full-page" className="App">
    <Menu />
    <CreatePetSection />
    </div>
  );
}

function CreatePetSection(): JSX.Element {
  const navigate = useNavigate();
  const { people, error: peopleError, loading: peopleLoading } = FetchPeople.useFetchPeople();
  
  if (peopleLoading) return <p>Loading...</p>;
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
    <section id="create-pet-page">
        <form id="creating-pet-form" onSubmit={(e) =>PetsHandler.handleSubmitPetCreate(e, navigate)} encType="multipart/form-data">
          <h2 id="header_form_label">Creating pet</h2><br/>
          <label>Name</label><br />
          <input type='text' name='name' placeholder="Name" required /><br/>
          <label>Breed</label><br />
          <select name="breed" defaultValue="placeholder" required>
            <option value="placeholder" disabled hidden selected>Select breed</option>
            {breeds}
          </select> <br />
          <label>Date of Birth</label><br />
          <input type='date' name='dateOfBirth' required/><br/>
          <label>Owner</label><br />
          <select name='ownerId' defaultValue="placeholder" required>
            <option value="placeholder" disabled hidden selected>Select owner</option>
            {owners}
          </select><br/>
          <label>Photo</label><br />
          <input type='file' name="photo" accept="image/*"/><br/>
          <Link to={`/`}><button className="form_button">Cancel</button></Link>
          <input className="form_button" type='submit' value='Save'/>
          </form>
    </section>
  );
}