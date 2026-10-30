import React from "react";
import AddressDetails from "./features/address/AddressDetails";
import SeaContainerDetails from "./features/seaContainerDetails/SeaContainerDetails";
import { PersonDashboard } from "./shared/components/Table/PersonDashboard";
// import ServiceEngineDataInitiation from './features/serviceEngineDataInitiation/ServiceEngineDataInitiation';
import { TaskDashboard } from "./shared/components/Board/TaskDashboard";
import { ShipmentChangeHistory } from "./features/shipmentService/ShipmentChangeHistory";
import ShipmentNotes from "./features/shipmentNotes/ShipmentNotes";
import DatesNode from "./features/datesNode/datesNode";
import { Tracking } from "./features/tracking/Tracking";
import ShipmentContent from "./features/shipmentContent/ShipmentContent";
import TrackAndTrace from "./features/Intrra/TrackAndTrace";
import ShippingInstructions from "./features/Intrra/ShippingInstructions";
import OverseasSummary from "./features/FreightInformation/OverseasSummary";

function App() {
  return (
    <div>
      <AddressDetails />
      <SeaContainerDetails />
      <ShipmentContent />
      <ShipmentNotes />
      {/* <ServiceEngineDataInitiation /> */}
      <PersonDashboard />
      <TaskDashboard />
      <ShipmentChangeHistory />
      <DatesNode />
      <Tracking />
      <TrackAndTrace/>
      <ShippingInstructions/>
      <OverseasSummary/>

    </div>
  );
}

export default App;
