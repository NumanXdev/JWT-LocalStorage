import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import RefrshHandler from "./Pages/RefrshHandler.jsx";
function App() {
  const [Authenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return Authenticated ? element : <Navigate to={"/login"} />;
  };

  return (
    <>
      <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
