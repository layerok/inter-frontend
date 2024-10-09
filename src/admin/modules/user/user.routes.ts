import { RouteObject } from "react-router-dom";
import { UserListRoute } from "src/admin/modules/user/views/UserListView.tsx";
import { UserLayoutView } from "src/admin/modules/user/views/UserLayoutView.tsx";
import { userLayoutPath } from "src/admin/modules/user/user.constants.ts";

export const userRoutes: RouteObject[] = [
  {
    path: userLayoutPath,
    Component: UserLayoutView,
    children: [
      {
        Component: UserListRoute,
        index: true,
        handle: {
          title: () => "User List",
        },
      },
    ],
  },
];
