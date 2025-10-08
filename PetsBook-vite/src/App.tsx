import { Routes, Route, Navigate } from "react-router-dom";
import {HomePage} from "./pages/HomePage";
import {PetInfoPage} from "./pages/PetInfoPage";
import {OwnersPage} from "./pages/OwnersPage";
import {PetsByTypePage} from "./pages/PetsByTypePage";
import {EditPetPage} from "./pages/EditPetPage";
import type { JSX } from 'react';

export function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pets/:id" element={<PetInfoPage />} />
      <Route path="/owners" element={<OwnersPage />} />
      <Route path="/pets-by-type/:id" element={<PetsByTypePage />} />
      <Route path="/edit-pet/:id" element={<EditPetPage />} />
      {/* <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" replace />} /> */}
    </Routes>
  );
}