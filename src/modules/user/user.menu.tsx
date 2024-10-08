import { MenuItem } from "src/components/AdminLayout/AdminLayout.types.ts";
import { UserRoles } from "src/modules/user/user.constants.ts";

export const userMenu: MenuItem[] = [
  {
    title: "Users",
    isAllowed: (user) => user.role === UserRoles.Admin,
  },
];
