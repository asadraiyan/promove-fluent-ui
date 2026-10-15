import React from "react";
import AddressDetails from "./features/address/AddressDetails";
import { PersonDashboard } from "./shared/components/Table/PersonDashboard";
// import ServiceEngineDataInitiation from './features/serviceEngineDataInitiation/ServiceEngineDataInitiation';
import {TaskDashboard} from "./shared/components/Board/TaskDashboard";

function App() {
  return (
    <div>
      <AddressDetails />
      {/* <ServiceEngineDataInitiation /> */}
      <PersonDashboard />
      <TaskDashboard />
    </div>
  );
}

export default App;
