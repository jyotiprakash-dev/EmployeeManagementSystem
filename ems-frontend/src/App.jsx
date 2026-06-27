import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';

function App() {
  return (
    <BrowserRouter>

      <HeaderComponent />

      <Routes>
        <Route path="/" element={<ListEmployeeComponent />} />
        <Route path="/add-employee" element={<AddEmployeeComponent />} />
        <Route path="/edit-employee/:id" element={<AddEmployeeComponent />} />
      </Routes>

      <FooterComponent />

    </BrowserRouter>
  );
}

export default App;