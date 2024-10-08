import { createBrowserRouter, Outlet } from "react-router-dom";
import { AdminHomeView } from "src/admin/views/AdminHomeView.tsx";
import { adminRoutePath } from "src/admin/admin.constants.ts";
import { AdminLayoutView } from "src/admin/views/AdminLayoutView/AdminLayoutView.tsx";
import { LoginView } from "src/auth/views/LoginView.tsx";
import { loginRoute } from "src/auth/auth.constants.ts";
import { ApiClientProvider } from "src/lib/js-sdk/ApiClientProvider.tsx";
import { apiClient } from "src/apiClient.ts";
import { userRoutes } from "src/admin/modules/user/user.routes.ts";
import { dashboardRoutePath } from "src/admin/admin.constants.ts";
import { DashboardView } from "src/admin/views/DashboardView.tsx";

export const router = createBrowserRouter([
  {
    element: (
      <ApiClientProvider client={apiClient}>
        <Outlet />
      </ApiClientProvider>
    ),
    children: [
      {
        path: loginRoute,
        element: <LoginView />,
      },
      {
        path: adminRoutePath,
        element: <AdminLayoutView />,
        children: [
          {
            index: true,
            element: <AdminHomeView />,
          },
          {
            path: dashboardRoutePath,
            element: <DashboardView />,
          },
          ...userRoutes,
        ],
      },
    ],
  },
]);
