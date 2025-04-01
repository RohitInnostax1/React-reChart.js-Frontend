import { createRoot } from "react-dom/client";
import "./index.css";

import { Navbar } from "./layout/Navbar.jsx";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Home } from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StrictMode } from "react";
import AddSmartPhone from "./pages/smartPhone/AddSmartPhone.jsx";
import EditSmartPhone from "./pages/smartPhone/EditSmartPhone.jsx";
import ChartSmartPhone from "./pages/charts/chartSmartPhone.jsx";

createRoot(document.getElementById("root")).render(
<StrictMode
><Router>
   

      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/chartView" element={<ChartSmartPhone/>}/>
        <Route exact path="/add/smartPhone" element={<AddSmartPhone/>}></Route>
        <Route exact path="/edit/smartPhone/:id" element={<EditSmartPhone/>}></Route>
      </Routes>
  
  </Router>
  </StrictMode>
);
