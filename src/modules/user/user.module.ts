import { createModule } from "src/factories/createModule.tsx";
import { adminRoute } from "src/constants/routes.constants.ts";
import { UsersLayoutView } from "src/modules/user/views/UsersLayoutView.tsx";
import { UserShowRoute } from "src/modules/user/views/UserShowView.tsx";
import { UserListRoute } from "src/modules/user/views/UserListView.tsx";
import { UserCreateRoute } from "src/modules/user/views/UserCreateView.tsx";

export const userModule = createModule({
  path: `${adminRoute}/users`,
  id: "user",
  showView: {
    route: {
      Component: UserShowRoute,
    },
  },
  listView: {
    route: {
      Component: UserListRoute,
    },
  },
  createView: {
    route: {
      Component: UserCreateRoute,
    },
  },
  layoutView: {
    route: {
      Component: UsersLayoutView,
    },
  },
});
