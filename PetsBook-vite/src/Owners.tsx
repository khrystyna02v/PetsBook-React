import {Menu, OwnersCatalog} from './react-functions';
import ReactDOM from 'react-dom/client';
import type { JSX } from 'react';
export function OwnersPage(): JSX.Element {
  return (
    <div id="full-page" className="App">
        <Menu />
        <OwnersCatalog />
    </div>
  );
}