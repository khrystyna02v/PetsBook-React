import {Menu, EditPetSection} from '../components/react-functions';
import ReactDOM from 'react-dom/client';
import type { JSX } from 'react';
import { useParams } from "react-router-dom";
export function EditPetPage(): JSX.Element {
  const {id} = useParams<{ id: string }>();
  return (
    <div id="full-page" className="App">
    <Menu />
    {EditPetSection(Number(id))}
    </div>
  );
}