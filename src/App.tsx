import React from 'react';
import { Button, Checkbox, Dropdown, FieldLabel } from './shared';
import AddressDetails from './features/address/AddressDetails';
import ServiceEngineDataInitiation from './features/serviceEngineDataInitiation/ServiceEngineDataInitiation';

function App() {
  return (
     <div>
      <AddressDetails/>
      <ServiceEngineDataInitiation />
    </div>

  );
}

export default App;
