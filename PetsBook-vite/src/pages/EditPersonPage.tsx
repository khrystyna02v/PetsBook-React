import {Menu} from '../components/Menu';
import * as Handlers from '../components/handlers';
import * as FetchFunctions from '../components/fetch-functions';
import type { JSX } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function EditPersonPage(): JSX.Element {
  const {name, surname} = useParams<{ name: string, surname: string }>();
  return (
    <div id="full-page" className="App">
    <Menu />
    {EditPersonSection(String(name), String(surname))}
    </div>
  );
}

function EditPersonSection(name: string, surname: string): JSX.Element {
  const navigate = useNavigate();
  const { personInfo, error, loading } = FetchFunctions.useFetchOwnerInfo(name, surname);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading: {error}</p>;
  if (!personInfo) return <p>Person not found.</p>;

  return (
    <section id="edit-person-page">
        <form id="editing-person-form" onSubmit={(e) =>Handlers.handleSubmitPersonEdit(e, personInfo.name ?? "", personInfo.surname ?? "", navigate)} encType="multipart/form-data">
          <h2 id="header_form_label">Editing {personInfo ? personInfo.name : "person"}</h2><br/>
          <label>Name</label><br />
          <input type='text' name='name' defaultValue={personInfo ? personInfo.name : "name"} required /><br/>
          <label>Surame</label><br />
          <input type='text' name='surname' defaultValue={personInfo ? personInfo.surname : "surname"} required /><br/>
          <label>Phone number</label><br/>
          <input type='phone' name='phone' defaultValue={personInfo ? personInfo.phoneNumber : "phone number"} required/><br/>
          <label>Email</label><br/>
          <input type='email' name='email' defaultValue={personInfo?.email ?? ""}/><br/>
          <label>Date of Birth</label><br />
          <input type='date' name='dateOfBirth' defaultValue={personInfo ? personInfo.dateOfBirth?.split("T")[0] : "unknown"}/><br/>
          <input className="form_button" type='reset'/>
          <input className="form_button" type='submit' value='Save'/>
          </form>
    </section>
  );
}