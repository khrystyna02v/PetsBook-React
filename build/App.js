import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, PetsCatalog } from './react-functions';
import ReactDOM from 'react-dom/client';
export function App() {
    return (_jsxs("div", { id: "full-page", className: "App", children: [_jsx(Menu, {}), _jsx(PetsCatalog, {})] }));
}
const container = document.getElementById('container');
const root = ReactDOM.createRoot(container);
root.render(_jsx(App, {}));
//# sourceMappingURL=App.js.map