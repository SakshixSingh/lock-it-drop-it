import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingpage";
import LockerRoom from "./pages/lockerroom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/locker" element={<LockerRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
