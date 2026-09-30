import React from 'react';
import { Button, Checkbox, Dropdown, FieldLabel } from './shared';
import AddressPage from './features/address/components/AddressPage';

function App() {
  return (
     <div>
      <FieldLabel required>
        Department
      </FieldLabel>

      <Dropdown
        placeholder="Select department"
        options={[
          {
            value: 'engineering',
            label: 'Engineering',
          },
          {
            value: 'hr',
            label: 'Human Resources',
          },
        ]}
      />

      <Checkbox label="Active Employee" />

      <Button appearance="primary">
        Save
      </Button>

      <AddressPage/>
    </div>

  );
}

export default App;
