import {Menu, PetsCatalog} from '../components/react-functions';
import ReactDOM from 'react-dom/client';
import type { JSX } from 'react';
export function HomePage(): JSX.Element {
  return (
    <div id="full-page" className="App">
        <Menu />
        <PetsCatalog />
    </div>
  );
}