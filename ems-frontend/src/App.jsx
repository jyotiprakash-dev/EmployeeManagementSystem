import { BrowserRouter, Route, Routes } from "react-router-dom";

import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import AddEmployeeComponent from "./components/AddEmployeeComponent";

import NotFoundComponent from "./components/NotFoundComponent";

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />

      <Routes>
        <Route path="/" element={<ListEmployeeComponent />} />
        <Route path="/add-employee" element={<AddEmployeeComponent />} />
        <Route path="/edit-employee/:id" element={<AddEmployeeComponent />} />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>

      <FooterComponent />
    </BrowserRouter>
  );
}

export default App;
