import { css } from "@emotion/react";
import { ChangeEventHandler, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userMutations } from "src/modules/user/user.mutations.ts";
import { useNavigate, useParams } from "react-router-dom";
import { userQueries } from "src/modules/user/user.queries.ts";

import { userModule } from "src/modules/user/user.module.ts";

export function UserShowRoute() {
  const params = useParams();

  const [name, setName] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.currentTarget.value);
  };

  const { data: userData, isLoading } = useQuery({
    ...userQueries.detail({
      user: params.id!,
    }),
  });

  const { mutate: updateUser } = useMutation({
    ...userMutations.updateDetail,
  });
  const { mutate: deleteUser } = useMutation({
    ...userMutations.deleteDetail,
  });

  useEffect(() => {
    if (userData) {
      setName(userData.data.name);
    }
  }, [userData]);

  if (isLoading) {
    return "loading..";
  }

  return (
    <div css={detailFormLayout}>
      <form
        style={{
          width: 150,
          gap: 10,
          display: "flex",
          flexDirection: "column",
        }}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input name={"name"} value={name} onChange={handleNameChange} />
        <button
          onClick={() => {
            updateUser(
              {
                params: {
                  user: params.id!,
                },
                data: {
                  name,
                },
              },
              {
                onSuccess: () => {
                  navigate(userModule.routes.layout.path);
                  queryClient.invalidateQueries({
                    queryKey: userQueries.lists(),
                    type: "all",
                  });
                },
              },
            );
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            deleteUser(
              {
                params: {
                  user: params.id!,
                },
              },
              {
                onSuccess: () => {
                  navigate(userModule.routes.layout.path);
                  queryClient.invalidateQueries({
                    queryKey: userQueries.lists(),
                    type: "all",
                  });
                },
              },
            );
          }}
        >
          Delete
        </button>
      </form>
    </div>
  );
}

const detailFormLayout = css({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
});
