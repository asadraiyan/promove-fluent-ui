import React from "react";
import AddressDetails from "./features/address/AddressDetails";
import { PersonDashboard } from "./shared/components/Table/PersonDashboard";
// import ServiceEngineDataInitiation from './features/serviceEngineDataInitiation/ServiceEngineDataInitiation';

function App() {
  return (
    <div>
      <AddressDetails />
      {/* <ServiceEngineDataInitiation /> */}
      <PersonDashboard />
    </div>
  );
}

export default App;
