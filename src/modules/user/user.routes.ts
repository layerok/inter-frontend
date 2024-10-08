import { RouteObject } from "react-router-dom";
import { UserShowRoute } from "src/modules/user/views/UserShowView.tsx";
import { UserListRoute } from "src/modules/user/views/UserListView.tsx";
import { UserCreateRoute } from "src/modules/user/views/UserCreateView.tsx";
import { UserLayoutView } from "src/modules/user/views/UserLayoutView.tsx";
import {
  userCreatePath,
  userLayoutPath,
  userShowPath,
} from "src/modules/user/user.constants.ts";

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
