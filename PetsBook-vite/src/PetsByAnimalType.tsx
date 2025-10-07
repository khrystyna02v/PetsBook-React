import {Menu, PetsByAnimalTypeCatalog} from './react-functions';
import ReactDOM from 'react-dom/client';
import type { JSX } from 'react';
export function PetsByAnimalType(): JSX.Element {
  return (
    <div id="full-page" className="App">
        <Menu />
        <PetsByAnimalTypeCatalog />
    </div>
  );
}