import { createBrowserRouter } from "react-router-dom";
import { AdminView } from "src/admin/views/AdminView.tsx";
import { adminRoute } from "src/constants/routes.constants.ts";
import { AdminLayout } from "src/components/AdminLayout/AdminLayout.tsx";
import { LoginView } from "src/auth/views/LoginView.tsx";
import { dashboard } from "src/dashboard/dashboard.route.tsx";
import { loginRoute } from "src/auth/auth.constants.ts";
import { userModule } from "src/modules/user/user.module.ts";

export const router = createBrowserRouter([
  {
    path: loginRoute,
    element: <LoginView />,
  },
  {
    path: adminRoute,
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminView />,
      },
      dashboard,
      ...userModule.routeObjects,
    ],
  },
]);
