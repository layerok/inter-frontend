import { Components } from "@intersog/js-sdk";

export type MenuItem = {
  title: string;
  isAllowed: (user: Components.Schemas.UserResource) => boolean;
};
