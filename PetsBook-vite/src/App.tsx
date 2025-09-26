import {Menu, PetsCatalog} from './react-functions';
import ReactDOM from 'react-dom/client';
import type { JSX } from 'react';
export function App(): JSX.Element {
  return (
    <div id="full-page" className="App">
        <Menu />
        <PetsCatalog />
    </div>
  );
}