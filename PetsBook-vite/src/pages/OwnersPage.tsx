import {Menu} from '../components/react-functions';
import ReactDOM from 'react-dom/client';
import type { JSX } from 'react';
import { Link } from "react-router-dom";
import * as Func from '../components/data-loading';
import { Person } from '../models/Person';

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
      <h2>Beautiful owners</h2>
      <PersonSearchBox/>
      <UploadPeopleIntoCatalog />
    </section>
  );
}
function PersonSearchBox(): JSX.Element {
  const handleSearchBox = (event: React.ChangeEvent<HTMLInputElement>) => {

    console.log('Search:', event.target.value);
  };
  return (
    <div>
      <input type="text" id="search-box" placeholder="Enter name or surname" onChange={handleSearchBox} />
      <div id="search-results-box">

      </div>
    </div>
  );
}

function UploadPeopleIntoCatalog(): JSX.Element {
  const { people, error, loading}: { people: Person[], error: string | null, loading: boolean } = Func.useFetchPeople();
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
        {person?.pets && person.pets?.length > 0 && (
          <div className="person-in-catalog-paws">
            <p>{person.pets?.length}</p>
            <img src="/paw.png" alt="pets count" />
          </div>
        )}
      </div>
    </Link>
  );
}