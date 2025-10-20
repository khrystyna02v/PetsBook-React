import {Menu} from '../components/Menu';
import * as FetchPeople from '../api-fetch-functions/fetch-people';
import type { JSX } from 'react';
import { Link } from "react-router-dom";
import { Person } from '../models/Person';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import type { ChangeEvent } from 'react';

type PersonProps = {
  person: Person;
};

export function OwnersPageBeginning(): JSX.Element {
  return (
    <div id="full-page" className="App">
        <Menu />
        <OwnersCatalogByBeginning />
    </div>
  );
}

export function OwnersCatalogByBeginning(): JSX.Element  {
  return (
    <section id="owners-page">
      <div id="button-header">
        <div id="button-header-text">
          <h2>Beautiful owners</h2>
        </div>
        <div id="create-person-button-div">
          <Link to={`/create-person`}><button id='create-person-button'>Add person</button></Link>
        </div>
      </div>
      <PersonSearchBoxBeginningPage/>
      <UploadPeopleByBeginningIntoCatalog />
    </section>
  );
}

export function PersonSearchBoxBeginningPage(): JSX.Element {
    const { beginning } = useParams<{ beginning: string }>();
    const navigate = useNavigate();
    const handleSearchBox = (e: ChangeEvent<HTMLInputElement>): void => {
    var beginning:string = e.target.value.trim();
    if (beginning.length == 1) {
      beginning = beginning.toUpperCase();
    }
    if (beginning) {
      navigate(`/owners/${beginning}`);
    } else {
      navigate('/owners');
    }
    };
    return (
        <div id="search-box">
            <img src='/search-icon.png' alt='search icon' id='search-icon'/>
            <input type="text" id='search-input' value={beginning ?? ''} autoFocus onChange={handleSearchBox} />
        </div>
    );
}

function UploadPeopleByBeginningIntoCatalog(): JSX.Element {
    const {beginning} = useParams<{ beginning: string }>();
    const { people, error, loading}: { people: Person[], error: string | null, loading: boolean } = FetchPeople.useFetchPeopleByBeginning(String(beginning));
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Incorrect language or register</p>;
    if (!people.length) return (
        <div id="owners-catalog">
            <p>No matches</p>
        </div>
    );
    return (
        <div id="owners-catalog">
        {people.map((p, idx) => (
            <PersonInSearch person={p} key={idx}/>
        ))}
        </div>
    );
}

function PersonInSearch( {person}: PersonProps): JSX.Element {
  return (
    <Link to={`/owners/${person.name}/${person.surname}`}>
      <div className="person-in-catalog" id={"person_" + person.personId}> 
        <img src="/default-owner.png" alt={person.name+" "+person.surname} />
        <div className="person-in-catalog-text">
          <h4>{person.name} {person.surname}</h4>
          <p>{person.phoneNumber}</p>
        </div>
      </div>
    </Link>
  );
}