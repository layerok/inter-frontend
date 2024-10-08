import { memo } from "react";
import { css } from "@emotion/react";
import { Menu } from "../Menu/Menu.tsx";

export function RawSidebar() {
  return (
    <aside css={rootStyles}>
      <Menu />
    </aside>
  );
}

const rootStyles = css`
  background-color: var(--background-color-inverse);
  border-right: 1px solid var(--border-color);
`;

export const Sidebar = memo(RawSidebar);
