import { css } from "@emotion/react";
import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userMutations } from "src/modules/user/user.mutations.ts";
import { useNavigate, useParams } from "react-router-dom";
import { userQueries } from "src/modules/user/user.queries.ts";
import { userListPath } from "src/modules/user/user.constants.ts";

export function UserShowRoute() {
  const params = useParams();

  const [name, setName] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: userData, isLoading } = useQuery({
    ...userQueries.detail({
      user: params.id!,
    }),
  });

  const { mutate: updateUser } = useMutation({
    ...userMutations.updateDetail,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(
        userQueries.detail({
          user: variables.params.user,
        }).queryKey,
        data,
      );
      return queryClient.invalidateQueries({
        queryKey: userQueries.lists(),
        refetchType: "all",
      });
    },
  });
  const { mutate: deleteUser } = useMutation({
    ...userMutations.deleteDetail,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: userQueries.lists(),
        refetchType: "all",
      });
    },
  });

  useEffect(() => {
    if (userData) {
      setName(userData.data.name);
    }
  }, [userData]);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.currentTarget.value);
  };

  const handleDelete = () => {
    deleteUser(
      {
        params: {
          user: params.id!,
        },
      },
      {
        onSuccess: () => {
          navigate(userListPath);
        },
      },
    );
  };

  const handleUpdate = () => {
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
          navigate(userListPath);
        },
      },
    );
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  if (isLoading) {
    return "loading..";
  }

  return (
    <div css={detailFormLayout}>
      <form style={formStyles} onSubmit={handleFormSubmit}>
        <input name={"name"} value={name} onChange={handleNameChange} />
        <button onClick={handleUpdate}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
}

const formStyles = {
  width: 150,
  gap: 10,
  display: "flex",
  flexDirection: "column",
} as const;

const detailFormLayout = css({
  flexGrow: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
});
