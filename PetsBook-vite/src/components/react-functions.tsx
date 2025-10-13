import {animals} from './data-loading';
import type { JSX } from 'react';
import { Link } from "react-router-dom";

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


//Видалення тварини
//Видалення людини
//Обробка винятків при запитах
//Пройтись по всіх файлах і додати типізацію TSX де її нема

//Стилізувати кнопку для завантажування фото
//API - переробити підтягування к-ті тварин в owners
