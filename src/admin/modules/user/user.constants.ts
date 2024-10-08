import { adminRoutePath } from "src/admin/admin.constants.ts";

const modulePath = `${adminRoutePath}/users`;

export const userLayoutPath = `${modulePath}`;
export const userListPath = `${modulePath}/`;
export const userCreatePath = `${modulePath}/create`;
export const userShowPath = `${modulePath}/:id`;

export const UserRoles = {
  Admin: "admin",
  Moderator: "moderator",
};
