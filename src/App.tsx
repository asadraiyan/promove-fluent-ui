import React from "react";
import { useForm } from "react-hook-form";
import { FormDropdown } from "./shared/components/Dropdown/Dropdown";

type AppComponent = React.LazyExoticComponent<React.ComponentType>;

const componentRegistry: Array<{
  label: string;
  value: string;
  component: AppComponent;
}> = [
  {
    label: "Move Notes",
    value: "move-notes",
    component: React.lazy(() =>
      import("./features/QuoteSection/MoveNotes/MoveNotesSection").then(
        ({ MoveNotesSection }) => ({
          default: MoveNotesSection,
        }),
      ),
    ),
  },
  {
    label: "Quote History",
    value: "quote-history",
    component: React.lazy(() =>
      import("./features/QuoteSection/QuoteHistory/QuoteHistorySection").then(
        ({ QuoteHistorySection }) => ({
          default: QuoteHistorySection,
        }),
      ),
    ),
  },

  {
    label: "Quote Details",
    value: "quote-details",
    component: React.lazy(
      () => import("./features/QuoteSection/QuoteDetails/QuoteDetails"),
    ),
  },
  {
    label: "Service Plans",
    value: "service-plans",
    component: React.lazy(() =>
      import("./features/QuoteSection/ServicePlan").then(
        ({ ServicePlansSection }) => ({
          default: ServicePlansSection,
        }),
      ),
    ),
  },

  {
    label: "Quoted Services",
    value: "quoted-services",
    component: React.lazy(() =>
      import("./features/QuoteSection/QuotedServices/QuotedServices").then(
        ({ QuotedServices }) => ({
          default: QuotedServices,
        }),
      ),
    ),
  },

  {
    label: "Accessorials",
    value: "accessorials",
    component: React.lazy(() =>
      import("./features/QuoteSection/AccessorialsSection").then(
        ({ AccessorialsSection }) => ({
          default: AccessorialsSection,
        }),
      ),
    ),
  },
  {
    label: "Optimize",
    value: "optimize",
    component: React.lazy(() =>
      import("./features/QuoteSection/Optimize/Optimize").then(({ Optimize }) => ({
        default: Optimize,
      })),
    ),
  },
  {
    label: "Trident Eligibility Setup",
    value: "trident-eligibility-setup",
    component: React.lazy(() =>
      import("./features/Operation/TridentElegibilitySetup").then(
        ({ TridentEligibilitySetup }) => ({
          default: TridentEligibilitySetup,
        }),
      ),
    ),
  },
  {
    label: "Staff Setup",
    value: "staff-setup",
    component: React.lazy(() => import("./features/staffSetup/StaffSetup")),
  },
  {
    label: "Triggers",
    value: "triggers",
    component: React.lazy(() => import("./features/triggers/Triggers")),
  },
  {
    label: "Debtors",
    value: "debtors",
    component: React.lazy(() => import("./features/debtors")),
  },
  {
    label: "Invoicing Address",
    value: "invoicing-address",
    component: React.lazy(() =>
      import("./features/invoicingAddress").then(({ InvoicingAddress }) => ({
        default: InvoicingAddress,
      })),
    ),
  },
  {
    label: "Address Details",
    value: "address-details",
    component: React.lazy(() => import("./features/address/AddressDetails")),
  },
  {
    label: "Sea Container Details",
    value: "sea-container-details",
    component: React.lazy(
      () => import("./features/seaContainerDetails/SeaContainerDetails"),
    ),
  },
  {
    label: "Shipment Content",
    value: "shipment-content",
    component: React.lazy(
      () => import("./features/shipmentContent/ShipmentContent"),
    ),
  },
  {
    label: "Shipment Notes",
    value: "shipment-notes",
    component: React.lazy(
      () => import("./features/shipmentNotes/ShipmentNotes"),
    ),
  },
  {
    label: "Person Dashboard",
    value: "person-dashboard",
    component: React.lazy(() =>
      import("./shared/components/Table/PersonDashboard").then(
        ({ PersonDashboard }) => ({
          default: PersonDashboard,
        }),
      ),
    ),
  },
  {
    label: "Task Dashboard",
    value: "task-dashboard",
    component: React.lazy(() =>
      import("./shared/components/Board/TaskDashboard").then(
        ({ TaskDashboard }) => ({
          default: TaskDashboard,
        }),
      ),
    ),
  },
  {
    label: "Shipment Change History",
    value: "shipment-change-history",
    component: React.lazy(() =>
      import("./features/shipmentService/ShipmentChangeHistory").then(
        ({ ShipmentChangeHistory }) => ({ default: ShipmentChangeHistory }),
      ),
    ),
  },
  {
    label: "Dates Node",
    value: "dates-node",
    component: React.lazy(() => import("./features/datesNode/datesNode")),
  },
  {
    label: "Tracking",
    value: "tracking",
    component: React.lazy(() =>
      import("./features/tracking/Tracking").then(({ Tracking }) => ({
        default: () => <Tracking goodsId="651097" />,
      })),
    ),
  },
  {
    label: "Track and Trace",
    value: "track-and-trace",
    component: React.lazy(() => import("./features/Intrra/TrackAndTrace")),
  },
  {
    label: "Shipping Instructions",
    value: "shipping-instructions",
    component: React.lazy(
      () => import("./features/Intrra/ShippingInstructions"),
    ),
  },
  {
    label: "Shipment Actions",
    value: "shipment-actions",
    component: React.lazy(() => import("./features/Actions/ShipmentActions")),
  },
  {
    label: "Overseas Summary",
    value: "overseas-summary",
    component: React.lazy(
      () => import("./features/FreightInformation/OverseasSummary"),
    ),
  },
  {
    label: "Payments",
    value: "payments",
    component: React.lazy(() =>
      import("./features/payments/PaymentsView").then(({ PaymentsView }) => ({
        default: PaymentsView,
      })),
    ),
  },
  {
    label: "Lost View",
    value: "lost-view",
    component: React.lazy(() =>
      import("./features/Lost/LostView").then(({ LostView }) => ({
        default: LostView,
      })),
    ),
  },
  {
    label: "Invoicing",
    value: "invoicing",
    component: React.lazy(() => import("./features/Invoicing/Invoicing")),
  },
  {
    label: "Supplier Details",
    value: "supplier-details",
    component: React.lazy(() => import("./features/companies/SupplierDetails")),
  },
];

const dropdownOptions = componentRegistry.map(({ label, value }) => ({
  label,
  value,
}));

function App() {
  const { control, watch } = useForm<{ component: string }>({
    defaultValues: { component: "" },
  });
  const selectedValue = watch("component");
  const SelectedComponent = componentRegistry.find(
    ({ value }) => value === selectedValue,
  )?.component;

  return (
    <div>
      <FormDropdown
        name="component"
        control={control}
        label="Component"
        options={dropdownOptions}
        placeholder="Select a component"
      />
      {SelectedComponent && (
        <React.Suspense fallback={<div>Loading component...</div>}>
          <SelectedComponent />
        </React.Suspense>
      )}
    </div>
  );
}

export default App;
