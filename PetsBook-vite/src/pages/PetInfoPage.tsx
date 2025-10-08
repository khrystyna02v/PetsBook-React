import {Menu, PetInfoSection} from '../components/react-functions';
import ReactDOM from 'react-dom/client';
import { useParams } from "react-router-dom";
import type { JSX } from 'react';
import { Link } from "react-router-dom";
import {UploadPetInfo} from '../components/react-functions';

export function PetInfoPage(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  return (
    <div id="full-page" className="App">
      <Menu />
      <section id="pet-info-page">
        <div id="pet-info-section">
          {UploadPetInfo(Number(id))}
          <Link to={`/`}><button>Back to catalog</button></Link>
          {/* <Link to={`/owner-deatails/${pet.owner.personId}`}><button>Owner details</button></Link> */}
          <Link to={`/edit-pet/${id}`}><button>Edit pet</button></Link>
        </div>
      </section>
    </div>
  );
}