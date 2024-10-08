import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

export function UsersLayoutView() {
  // const navigate = useNavigate();

  return (
    <div css={layoutStyles}>
      Users module
      <Outlet />
    </div>
  );
}

const layoutStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
