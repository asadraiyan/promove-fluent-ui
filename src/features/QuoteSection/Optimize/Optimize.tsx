import React, { useState } from "react";
import {
  makeStyles,
  Text,
  tokens,
} from "@fluentui/react-components";
import { AddRegular, SubtractRegular } from "@fluentui/react-icons";
import { GridColumnDef, ResponsiveGrid, SharedDataGrid, Button } from "@/shared";
import optimizeData from "./data.json";
import type { OptimizeRouteRow, ReciprocityRow } from "./types";
const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    padding: tokens.spacingHorizontalL,
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100%",
    boxSizing: "border-box",
  },
  sectionCard: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalM,
    minWidth: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: tokens.spacingHorizontalM,
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  reciprocityGrid: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: tokens.spacingHorizontalM,
  },
  tablePanel: {
    minWidth: 0,
  },
  actionBar: {
    display: "flex",
    alignItems: "center",
    gap: tokens.spacingHorizontalS,
    flexWrap: "wrap",
  },
  routes: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalXS,
  },
  route: {
    minWidth: 0,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    overflow: "hidden",
  },
  routeHeader: {
    width: "100%",
    justifyContent: "flex-start",
    borderRadius: 0,
    padding: `${tokens.spacingVerticalS} ${tokens.spacingHorizontalM}`,
    backgroundColor: tokens.colorNeutralBackground2,
  },
  routeContent: {
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalS,
    minWidth: 0,
  },
  routeFooter: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
  totals: {
    display: "flex", 
    alignItems: "center",
    gap: tokens.spacingHorizontalM,
    flexWrap: "wrap",
  },
});

const reciprocityColumns: GridColumnDef<ReciprocityRow>[] = [
  { key: "agentName", label: "Agent Name", minWidth: 220 },
  { key: "plannedPercent", label: "Planned Percent", minWidth: 140 },
  { key: "actualPercent", label: "Actual Percent", minWidth: 140 },
];

const routeColumns: GridColumnDef<OptimizeRouteRow>[] = [
  { key: "rowNumber", label: "No", minWidth: 52 },
  { key: "expenseType", label: "Expense Type", minWidth: 250 },
  { key: "from", label: "From", minWidth: 140 },
  { key: "to", label: "To", minWidth: 140 },
  { key: "carrier", label: "Carrier", minWidth: 220 },
  {
    key: "rate",
    label: "Rate",
    minWidth: 110,
    accessor: (item) => item.rate,
    renderCell: (item) => item.rate.toFixed(2),
  },
  {
    key: "days",
    label: "Days",
    minWidth: 80,
    accessor: (item) => item.days,
    renderCell: (item) => item.days.toFixed(2),
  },
  { key: "quality", label: "Quality", minWidth: 110 },
  { key: "claims", label: "Claims", minWidth: 110 },
];

export const Optimize: React.FC = () => {
  const styles = useStyles();
  const [expandedRoutes, setExpandedRoutes] = useState<string[]>([
    optimizeData.routes[0].id,
  ]);
  const optimizeRoutes = optimizeData.routes.map((route) => ({
    ...route,
    rows: optimizeData.routeRows.map((row) => ({
      ...row,
      id: `${route.id}-${row.id}`,
    })),
  }));

  const toggleRoute = (routeId: string) => {
    setExpandedRoutes((currentRoutes) =>
      currentRoutes.includes(routeId)
        ? currentRoutes.filter((id) => id !== routeId)
        : [...currentRoutes, routeId],
    );
  };

  return (
    <main className={styles.root}>
      <section className={styles.sectionCard} aria-labelledby="reciprocity-title">
        <Text id="reciprocity-title" weight="semibold" size={400}>
          Reciprocity Data
        </Text>
        <ResponsiveGrid className={styles.reciprocityGrid}>
          {[0, 1].map((tableIndex) => (
            <div
              className={styles.tablePanel}
              key={`reciprocity-table-${tableIndex}`}
              aria-label={`Reciprocity data table ${tableIndex + 1}`}
            >
              <SharedDataGrid
                items={optimizeData.reciprocityData}
                columns={reciprocityColumns}
                getRowId={(item) => item.id}
                showSearch={false}
                enableColumnPinning={false}
              />
            </div>
          ))}
        </ResponsiveGrid>
      </section>

      <section className={styles.sectionCard} aria-labelledby="optimize-title">
        <Text id="optimize-title" weight="semibold" size={400}>
          Optimize
        </Text>
        <div className={styles.actionBar}>
          <Button appearance="primary">Optimize</Button>
          <Button appearance="secondary" disabled>Check Available Suppliers</Button>
        </div>

        <div className={styles.routes}>
          {optimizeRoutes.map((route) => {
            const isExpanded = expandedRoutes.includes(route.id);
            const totalCost = route.rows.reduce((total, row) => total + row.rate, 0);
            const totalDays = route.rows.reduce((total, row) => total + row.days, 0);

            return (
              <section className={styles.route} key={route.id}>
                <Button
                  className={styles.routeHeader}
                  appearance="subtle"
                  icon={isExpanded ? <SubtractRegular /> : <AddRegular />}
                  onClick={() => toggleRoute(route.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`${route.id}-content`}
                >
                  {route.label}
                </Button>
                {isExpanded && (
                  <div
                    className={styles.routeContent}
                    id={`${route.id}-content`}
                  >
                    <SharedDataGrid
                      items={route.rows}
                      columns={routeColumns}
                      getRowId={(item) => item.id}
                      showSearch={false}
                      enableColumnPinning={false}
                    />
                    <div className={styles.routeFooter}>
                      <Button appearance="secondary">
                        Accept {route.label}
                      </Button>
                      <div className={styles.totals}>
                        <Text weight="semibold">Total Cost USD:</Text>
                        <Text>${totalCost.toFixed(2)}</Text>
                        <Text weight="semibold">Total Days:</Text>
                        <Text>{totalDays.toFixed(2)}</Text>
                      </div>
                    </div>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Optimize;
