import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Auth from "./pages/auth";
import Protect from "./components/Protect";

const App = () => {
  return (
    <div className="bg-gray-100 h-[100vh] w-[100vw]">
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Auth />} />

          <Route element={<Protect />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
