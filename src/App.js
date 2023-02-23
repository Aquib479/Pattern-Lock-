import React from "react";
import SetPattern from "./components/SetPattern";
import ConfirmPattern from "./components/ConfirmPattern";
import DrawPattern from "./components/DrawSetPattern";
import OldPattern from "./components/OldPattern";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="bg-gray-600 text-white w-screen h-screen">
      <div className="flex flex-col justify-center items-center">
        <p className="pt-8 font-bold text-2xl">Pattern Lock Using React JS</p>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<SetPattern />} />
            <Route exact path="/confirmpattern" element={<ConfirmPattern />} />
            <Route exact path="/drawpattern" element={<DrawPattern />} />
            <Route exact path="/oldpattern" element={<OldPattern />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
