import { MenuItem } from "src/admin/views/AdminLayoutView/AdminLayoutView.types.ts";
import { UserRoles } from "src/admin/modules/user/user.constants.ts";

export const userMenu: MenuItem[] = [
  {
    title: "Users",
    isAllowed: (user) => user.role === UserRoles.Admin,
  },
];
