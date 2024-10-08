import { adminRoute } from "src/constants/routes.constants.ts";

const modulePath = `${adminRoute}/users`;

export const userLayoutPath = `${modulePath}`;
export const userListPath = `${modulePath}/`;
export const userCreatePath = `${modulePath}/create`;
export const userShowPath = `${modulePath}/:id`;

export const UserRoles = {
  Admin: "admin",
  Moderator: "moderator",
};
