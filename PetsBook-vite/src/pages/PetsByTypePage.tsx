import {Menu, PetsByAnimalTypeCatalog} from '../components/react-functions';
import ReactDOM from 'react-dom/client';
import type { JSX } from 'react';
export function PetsByTypePage(): JSX.Element {
  return (
    <div id="full-page" className="App">
        <Menu />
        <PetsByAnimalTypeCatalog />
    </div>
  );
}