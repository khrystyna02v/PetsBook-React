import {Menu, PetInfoSection} from './react-functions';
import ReactDOM from 'react-dom/client';
import type { JSX } from 'react';
function PetInfoPage(): JSX.Element {
  return (
    <div id="full-page" className="App">
    <Menu />
    <PetInfoSection />
    </div>
  );
}