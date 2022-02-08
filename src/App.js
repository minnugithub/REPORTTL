import React from "react";
import Tabledetails from "./components/OwnerReportSection/TableSection/Table";
import {BrowserRouter as Router , Route,Routes } from "react-router-dom";
import Card from "./components/OwnerReportSection/CardSection/Card";
import AddTask from "./components/OwnerReportSection/Taskmanagement/addTask";

function App() {
  return (
    <Router>
      <Routes>
     <Route exact path ="/" element={<Card/>}>
     </Route>
     <Route exact path="/Table/:uid" element={<Tabledetails/>}>
     </Route>
     <Route exact path="/addTask/:uid" element={<AddTask/>}>
     </Route>
     </Routes>
    </Router>
  );
}

export default App;
