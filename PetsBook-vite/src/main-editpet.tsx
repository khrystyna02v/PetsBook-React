import React from 'react';
import ReactDOM from 'react-dom/client';
import { EditPetPage } from './EditPet';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <EditPetPage />
  </React.StrictMode>
);
