import {animals} from './pet-utils';
import type { JSX } from 'react';
import { Link } from "react-router-dom";

function Submenu(): JSX.Element {
  const listItems: JSX.Element[] = Object.keys(animals)
  .filter(id => !isNaN(Number(id)))
  .map(id => (
    <li key={id}>
      <Link to={`/pets-by-type/${Number(id)}`}>{animals[Number(id)]}s</Link>
    </li>
  ));
  
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