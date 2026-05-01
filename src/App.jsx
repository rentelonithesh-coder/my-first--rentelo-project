import React from "react";
import { Routes, Route } from "react-router-dom";
import RenteloLinks3d from "./components/RenteloLinks3d";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-50 via-white to-blue-50">
      <main className="flex-grow w-full mx-auto">
        <Routes>
           <Route path="/" element={<RenteloLinks3d />} />
        </Routes>
      </main>
    </div>
  );
}
