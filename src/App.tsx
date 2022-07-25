import { DaftarPetani, Form, Profile } from "./pages";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { MapCore, Nav } from "./components";
import { useEffect, useState } from "react";
import PrivateRoutes from "./PrivateRoutes";

interface IAuth {
  type: string | null;
  status: boolean;
}

function App() {
  const sessionAuth = sessionStorage.getItem("auth");
  const initialState = () => JSON.parse(sessionAuth as string);
  const [auth, setAuth] = useState<IAuth>(initialState);

  return (
    <Router>
      <Nav auth={auth} setAuth={setAuth} />
      <Routes>
        <Route path='/' element={<MapCore />} />
        <Route element={<PrivateRoutes authenticated={auth.status && auth.type === "admin"} />}>
          {/* Admin */}
          <Route path='/dashboard/admin'>
            <Route index element={<DaftarPetani />} />
            <Route path='profile-petmil' element={<Profile />} />
            <Route path='profile-petmil-sebelum' element={<Profile />} />
          </Route>
        </Route>
        {/* Petmil */}
        <Route element={<PrivateRoutes authenticated={auth.status && auth.type === "petmil"} />}>
          <Route path='/dashboard/petmil' element={<Form />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
