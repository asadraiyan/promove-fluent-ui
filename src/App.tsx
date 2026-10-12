import React from 'react';
import AddressDetails from './features/address/AddressDetails';
import Employee from './features/serviceEngineDataInitiation/Employee';
// import ServiceEngineDataInitiation from './features/serviceEngineDataInitiation/ServiceEngineDataInitiation';

function App() {
  return (
     <div>
      <AddressDetails/>
      {/* <ServiceEngineDataInitiation /> */}
      <Employee employees={[]} />
    </div>

  );
}

export default App;
