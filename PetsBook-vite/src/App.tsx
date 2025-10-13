import { Routes, Route, Navigate } from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {PetInfoPage} from "./pages/PetInfoPage";
import {OwnersPage} from "./pages/OwnersPage";
import {PetsByTypePage} from "./pages/PetsByTypePage";
import {EditPetPage} from "./pages/EditPetPage";
import {OwnerInfoPage} from "./pages/OwnerInfoPage";
import {EditPersonPage} from "./pages/EditPersonPage";
import type { JSX } from 'react';
import { OwnersPageBeginning } from "./pages/OwnersPageBeginning";
import { CreatePetPage } from "./pages/CreatePetPage";
import { CreatePersonPage } from "./pages/CreatePersonPage";

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pets/:id" element={<PetInfoPage />} />
      <Route path="/edit-pet/:id" element={<EditPetPage />} />
      <Route path="/create-pet" element={<CreatePetPage />} />
      <Route path="/pets-by-type/:id" element={<PetsByTypePage />} />
      <Route path="/owners" element={<OwnersPage />} />
      <Route path="/owners/:name/:surname" element={<OwnerInfoPage />} />
      <Route path="/owners/:beginning" element={<OwnersPageBeginning />} />
      <Route path="/edit-person/:name/:surname" element={<EditPersonPage />} />
      <Route path="/create-person" element={<CreatePersonPage />} />
      {/* <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} /> */}
    </Routes>
  );
}