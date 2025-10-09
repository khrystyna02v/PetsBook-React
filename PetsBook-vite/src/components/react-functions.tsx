import {animals} from './data-loading';
import type { JSX } from 'react';
import { Pet } from '../models/Pet';
import * as Func from './data-loading';
import { Link } from "react-router-dom";

type PetProps = {
  pet: Pet;
};

function Submenu (): JSX.Element {
  const listItems: JSX.Element[] = Object.keys(animals).map(id => (<li key={id}><Link to={`/pets-by-type/${Number(id)}`}>{animals[Number(id)]}s</Link></li>));
  return (
    <ul id="submenu-list">{listItems}</ul>
  );
}

export function Menu(): JSX.Element {
    return (
      <section id="menu">
        <h1>Pets book</h1>
        <ul id="menu-list">
            <Link to={`/`}><li>Pets Catalog</li></Link>
            <li id="no-link-menu"><a href="#">By type:</a></li>
            <Submenu />
            <Link to={`/owners`}><li>Owners</li></Link>
        </ul>
      </section>
    );
}

export function PetInCatalog( {pet}: PetProps): JSX.Element {
  return (
    <Link to={`/pets/${pet.petId}`}>
      <div className="pet-in-catalog" id={"pet_" + pet.petId}>
        <img 
        src={Func.getPhotoUrl(pet.photoPath)} 
        onError={(e) => { e.currentTarget.src = "/default.png"; }} 
        className="pet-img" 
        alt={pet.name} 
      />
        <h4>{pet.name}</h4>
        <p>{Func.getAnimalType(pet.animalTypeId)}</p>
      </div>
    </Link>
  );
}


//Форма додавати тваринку + аплоадити картинку
//Стилізувати кнопку для завантажування фото
//API - переробити підтягування к-ті тварин в owners
//Пошук за першими символами імені/прізвища owner-а