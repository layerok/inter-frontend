import { DashboardView } from "src/dashboard/views/DashboardView.tsx";
import {
  dashboardRouteId,
  dashboardRoutePath,
} from "src/dashboard/dashboard.constants.ts";

export const dashboard = {
  id: dashboardRouteId,
  path: dashboardRoutePath,
  element: <DashboardView />,
};
