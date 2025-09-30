import {Menu, EditPetSection} from './react-functions';
import ReactDOM from 'react-dom/client';
import type { JSX } from 'react';
export function EditPetPage(): JSX.Element {
  return (
    <div id="full-page" className="App">
    <Menu />
    <EditPetSection />
    </div>
  );
}