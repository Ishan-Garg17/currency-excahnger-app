import React, { useState } from "react";
import { Route, Routes } from "react-router";
import "./App.css";
import Details from "./Components/Details";
import Home from "./Components/Home";
import Navbar from "./Components/Navbar/Navbar";
import { leftListData, rightListData } from "./API DATA/symbols";

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home leftList={leftListData} rightList={rightListData} />}
        ></Route>
        <Route
          path="home"
          element={<Home leftList={leftListData} rightList={rightListData} />}
        ></Route>
        <Route path="details" element={<Details />}></Route>
      </Routes>
    </div>
  );
};

export default App;
