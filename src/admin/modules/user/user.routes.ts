import { RouteObject } from "react-router-dom";
import { UserShowRoute } from "src/admin/modules/user/views/UserShowView.tsx";
import { UserListRoute } from "src/admin/modules/user/views/UserListView.tsx";
import { UserCreateRoute } from "src/admin/modules/user/views/UserCreateView.tsx";
import { UserLayoutView } from "src/admin/modules/user/views/UserLayoutView.tsx";
import {
  userCreatePath,
  userLayoutPath,
  userShowPath,
} from "src/admin/modules/user/user.constants.ts";

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
      {
        path: userCreatePath,
        Component: UserCreateRoute,
        handle: {
          title: () => "Create User",
        },
      },
      {
        path: userShowPath,
        Component: UserShowRoute,
        handle: {
          title: (params: { id: string }) => `Update User #${params.id}`,
        },
      },
    ],
  },
];
