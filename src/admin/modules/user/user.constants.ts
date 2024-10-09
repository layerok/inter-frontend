import { adminRoutePath } from "src/admin/admin.constants.ts";

const modulePath = `${adminRoutePath}/users`;

export const userLayoutPath = `${modulePath}`;
export const userListPath = `${modulePath}/`;

export const UserRoles = {
  Admin: "admin",
  Moderator: "moderator",
};

export const UserModals = {
  Create: "create",
  Edit: "edit",
};

export const UserQueryParams = {
  Modal: "modal",
  Id: "id",
};
