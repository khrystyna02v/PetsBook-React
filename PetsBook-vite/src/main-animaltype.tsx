import React from 'react';
import ReactDOM from 'react-dom/client';
import { PetsByAnimalType } from './PetsByAnimalType';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <PetsByAnimalType />
  </React.StrictMode>
);
