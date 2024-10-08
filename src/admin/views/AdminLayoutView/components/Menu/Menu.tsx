import { Link } from "react-router-dom";

import { css } from "@emotion/react";
import { dashboardRoutePath } from "src/admin/admin.constants.ts";
import { useLoggedInUser } from "src/auth/hooks/useLoggedInUser.ts";
import { userListPath } from "src/admin/modules/user/user.constants.ts";
import { userMenu } from "src/admin/modules/user/user.menu.tsx";
import { MenuItem } from "src/admin/views/AdminLayoutView/AdminLayoutView.types.ts";

const items: MenuItem[] = [...userMenu];

export const Menu = () => {
  const { data: user } = useLoggedInUser();

  return (
    <nav css={rootStyles}>
      <Link css={linkStyles} to={dashboardRoutePath}>
        Dashboard
      </Link>
      {items
        .filter((item) => user && item.isAllowed(user.data))
        .map((item) => (
          <Link css={linkStyles} to={userListPath}>
            {item.title}
          </Link>
        ))}
    </nav>
  );
};

const linkStyles = css`
  padding: 10px 15px;
  border-bottom: 1px solid var(--border-color);
  font-size: 14px;
  color: var(--foreground-color-inverse);
  text-decoration: none;
`;

const rootStyles = css`
  display: flex;
  flex-direction: column;
`;
