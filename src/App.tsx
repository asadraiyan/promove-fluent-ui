import React from "react";
import AddressDetails from "./features/address/AddressDetails";
import SeaContainerDetails from "./features/seaContainerDetails/SeaContainerDetails";
import { PersonDashboard } from "./shared/components/Table/PersonDashboard";
// import ServiceEngineDataInitiation from './features/serviceEngineDataInitiation/ServiceEngineDataInitiation';
import { TaskDashboard } from "./shared/components/Board/TaskDashboard";
import { ShipmentChangeHistory } from "./features/shipmentService/ShipmentChangeHistory";
import ShipmentNotes from "./features/shipmentNotes/ShipmentNotes";

function App() {
  return (
    <div>
      <AddressDetails />
      <SeaContainerDetails />
      <ShipmentNotes/>
      {/* <ServiceEngineDataInitiation /> */}
      <PersonDashboard />
      <TaskDashboard />
      <ShipmentChangeHistory />
    </div>
  );
}

export default App;
