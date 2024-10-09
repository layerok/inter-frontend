import {
  Outlet,
  useMatches,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { css } from "@emotion/react";
import { Modal } from "src/components/Modal/Modal.tsx";
import { UserCreateRoute } from "src/admin/modules/user/views/UserCreateView.tsx";
import { UserShowRoute } from "src/admin/modules/user/views/UserShowView.tsx";
import {
  UserModals,
  UserQueryParams,
} from "src/admin/modules/user/user.constants.ts";

export function UserLayoutView() {
  // const navigate = useNavigate();
  const matches = useMatches();
  const [searchParams, setSearchParams] = useSearchParams();
  const match = matches[matches.length - 1];
  const params = useParams();
  // @ts-ignore
  const title = match.handle?.title(params);
  const modal = searchParams.get(UserQueryParams.Modal);

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
      {modal &&
        {
          [UserModals.Create]: (
            <Modal
              onClose={() => {
                searchParams.delete(UserQueryParams.Modal);
                setSearchParams();
              }}
            >
              <UserCreateRoute />
            </Modal>
          ),
          [UserModals.Edit]: (
            <Modal
              onClose={() => {
                searchParams.delete(UserQueryParams.Modal);
                searchParams.delete(UserQueryParams.Id);
                setSearchParams();
              }}
            >
              <UserShowRoute />
            </Modal>
          ),
        }[modal]}
    </div>
  );
}

const layoutStyles = css`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
