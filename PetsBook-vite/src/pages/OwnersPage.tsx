import {Menu} from '../components/Menu';
import * as FetchPeople from '../api-fetch-functions/fetch-people';
import type { JSX } from 'react';
import { Link } from "react-router-dom";
import { Person } from '../models/Person';
import { useNavigate } from "react-router-dom";
import type { ChangeEvent } from 'react';

type PersonProps = {
  person: Person;
};

export function OwnersPage(): JSX.Element {
  return (
    <div id="full-page" className="App">
        <Menu />
        <OwnersCatalog />
    </div>
  );
}

export function OwnersCatalog(): JSX.Element  {
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
      <PersonSearchBox/>
      <UploadPeopleIntoCatalog />
    </section>
  );
}
export function PersonSearchBox(): JSX.Element {
    const navigate = useNavigate();
    const handleSearchBox = (e: ChangeEvent<HTMLInputElement>): void => {
    var beginning: string = e.target.value.trim();
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
      <input autoFocus type="text" id='search-input' placeholder="Enter beginning of name or surname" onChange={handleSearchBox} />
    </div>
  );
}

function UploadPeopleIntoCatalog(): JSX.Element {
  const { people, error, loading}: { people: Person[], error: string | null, loading: boolean } = FetchPeople.useFetchPeople();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!people.length) return <p>No owners found</p>;
  return (
    <div id="owners-catalog">
      {people.map((p, idx) => (
        <PersonInCatalog person={p} key={idx}/>
      ))}
    </div>
  );
}

function PersonInCatalog( {person}: PersonProps): JSX.Element {
  return (
    <Link to={`/owners/${person.name}/${person.surname}`}>
      <div className="person-in-catalog" id={"person_" + person.personId}> 
        <img src="default-owner.png" alt={person.name+" "+person.surname} />
        <div className="person-in-catalog-text">
          <h4>{person.name} {person.surname}</h4>
          <p>{person.phoneNumber}</p>
        </div>
        { person?.pets && person.pets?.length > 0 && (
          <div className="person-in-catalog-paws">
            <p>{person.pets?.length}</p>
            <img src="/paw.png" alt="pets count" />
          </div>
        )}
      </div>
    </Link>
  );
}