import {Menu} from '../components/Menu';
import type { JSX } from 'react';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as PeopleHandler from '../button-handlers/buttonhandlers-people';
import { Link } from "react-router-dom";

export function CreatePersonPage(): JSX.Element {
  const {name, surname} = useParams<{ name: string, surname: string }>();
  return (
    <div id="full-page" className="App">
    <Menu />
    <CreatePersonSection />
    </div>
  );
}

function CreatePersonSection(): JSX.Element {
  const navigate = useNavigate();
  return (
    <section id="create-person-page">
        <form id="creating-person-form" onSubmit={(e) => { PeopleHandler.handleSubmitPersonCreate(e, navigate); }} encType="multipart/form-data">
          <h2 id="header_form_label">Creating person</h2><br/>
          <label>Name</label><br />
          <input type='text' name='name' placeholder="Name" required /><br/>
          <label>Surame</label><br />
          <input type='text' name='surname' placeholder="Surname" required /><br/>
          <label>Phone number</label><br/>
          <input type='phone' name='phone' placeholder="Phone number" required/><br/>
          <label>Email</label><br/>
          <input type='email' name='email' placeholder="Email"/><br/>
          <label>Date of Birth</label><br />
          <input type='date' name='dateOfBirth' required /><br/>
          <Link to={`/owners`}><button className="form_button">Cancel</button></Link>
          <input className="form_button" type='submit' value='Save'/>
          </form>
    </section>
  );
}