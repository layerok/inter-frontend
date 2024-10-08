import { Link } from "react-router-dom";

import { css } from "@emotion/react";
import { dashboardRoutePath } from "src/dashboard/dashboard.constants.ts";
import { userModule } from "src/modules/user/user.module.ts";

export const Menu = () => {
  return (
    <nav css={rootStyles}>
      <Link css={linkStyles} to={dashboardRoutePath}>
        Dashboard
      </Link>
      <Link css={linkStyles} to={userModule.routes.layout.path}>
        Users
      </Link>
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
