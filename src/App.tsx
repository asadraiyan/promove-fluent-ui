import React from "react";
import AddressDetails from "./features/address/AddressDetails";
import SeaContainerDetails from "./features/seaContainerDetails/SeaContainerDetails";
import { PersonDashboard } from "./shared/components/Table/PersonDashboard";
// import ServiceEngineDataInitiation from './features/serviceEngineDataInitiation/ServiceEngineDataInitiation';
import { TaskDashboard } from "./shared/components/Board/TaskDashboard";
import { AdhocGlobalcoActions } from "./features/actionButtons/AdhocGlobalcoActions";
import { ShipmentChangeHistory } from "./features/shipmentService/ShipmentChangeHistory";

function App() {
  return (
    <div>
      <AddressDetails />
      <SeaContainerDetails />
      {/* <ServiceEngineDataInitiation /> */}
      <PersonDashboard />
      <TaskDashboard />
      <ShipmentChangeHistory />
    </div>
  );
}

export default App;
