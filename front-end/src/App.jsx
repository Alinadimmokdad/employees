import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DeleteEmployee from "./pages/DeleteEmployee";
import EditEmployee from "./pages/EditEmployee";
import CreateEmployee from "./pages/CreateEmployee";
import ShowEmployee from "./pages/ShowEmployee";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/employees/create" element={<CreateEmployee />}></Route>
      <Route path="/employees/details/:id" element={<ShowEmployee />}></Route>
      <Route path="/employees/edit/:id" element={<EditEmployee />}></Route>
      <Route path="/employees/delete/:id" element={<DeleteEmployee />}></Route>
    </Routes>
  );
};

export default App;
