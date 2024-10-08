import { Outlet, useMatches, useParams } from "react-router-dom";
import { css } from "@emotion/react";

export function UserLayoutView() {
  // const navigate = useNavigate();
  const matches = useMatches();
  const match = matches[matches.length - 1];
  const params = useParams();
  // @ts-ignore
  const title = match.handle?.title(params);

  return (
    <div css={layoutStyles}>
      {title && <div>{title}</div>}
      <div
        style={{
          padding: 10,
          height: "100%",
          border: "1px solid var(--border-color)",
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}

const layoutStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
