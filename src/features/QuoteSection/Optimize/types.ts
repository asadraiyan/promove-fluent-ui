export interface ReciprocityRow {
  id: string;
  agentName: string;
  plannedPercent: string;
  actualPercent: string;
}

export interface OptimizeRouteRow {
  id: string;
  rowNumber: number;
  expenseType: string;
  from: string;
  to: string;
  carrier: string;
  rate: number;
  days: number;
  quality: string;
  claims: string;
}

export interface OptimizeRoute {
  id: string;
  label: string;
  rows: OptimizeRouteRow[];
}
