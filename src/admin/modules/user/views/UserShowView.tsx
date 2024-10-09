import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userMutations } from "src/admin/modules/user/user.mutations.ts";
import { useNavigate, useSearchParams } from "react-router-dom";
import { userQueries } from "src/admin/modules/user/user.queries.ts";
import {
  userListPath,
  UserQueryParams,
  UserRoles,
} from "src/admin/modules/user/user.constants.ts";
import { invariant } from "src/utils/invariant.ts";

export function UserShowRoute() {
  const [searchParams] = useSearchParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const id = searchParams.get(UserQueryParams.Id);

  invariant(!!id, "user id should be present in search parameters");

  const { data: userData, isLoading } = useQuery({
    ...userQueries.detail({
      user: id,
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

  const goToList = () => {
    searchParams.delete(UserQueryParams.Modal);
    searchParams.delete(UserQueryParams.Id);
    navigate({
      pathname: userListPath,
      search: searchParams.toString(),
    });
  };

  useEffect(() => {
    if (userData) {
      setName(userData.data.name);
      setRole(userData.data.role);
      setEmail(userData.data.email);
    }
  }, [userData]);

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.currentTarget.value);
  };
  const handleEmailChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setEmail(e.currentTarget.value);
  };
  const handlePasswordChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setPassword(e.currentTarget.value);
  };
  const handleRoleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setPassword(e.currentTarget.value);
  };

  const handleDelete = () => {
    deleteUser(
      {
        params: {
          user: id,
        },
      },
      {
        onSuccess: () => {
          goToList();
        },
      },
    );
  };

  const handleUpdate = () => {
    updateUser(
      {
        params: {
          user: id,
        },
        data: {
          name,
        },
      },
      {
        onSuccess: () => {
          goToList();
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
    <div style={rootStyle}>
      <form style={formStyles} onSubmit={handleFormSubmit}>
        <div style={controlStyle}>
          <label style={labelStyle}>Name</label>
          <input name={"name"} value={name} onChange={handleNameChange} />
        </div>
        <div style={controlStyle}>
          <label style={labelStyle}>Email</label>
          <input name={"email"} value={email} onChange={handleEmailChange} />
        </div>

        <div style={controlStyle}>
          <label style={labelStyle}>Password</label>
          <input
            name={"password"}
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div style={controlStyle}>
          <label style={labelStyle}>Role</label>
          <select name={"role"} value={role} onChange={handleRoleChange}>
            <option value={""}>Select role</option>
            {[UserRoles.Admin, UserRoles.Moderator].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleUpdate}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </form>
    </div>
  );
}

const controlStyle = {
  display: "flex",
  flexDirection: "column",
} as const;

const labelStyle = {
  fontSize: 12,
} as const;

const formStyles = {
  width: 150,
  gap: 10,
  display: "flex",
  flexDirection: "column",
} as const;

const rootStyle = {
  flexGrow: 1,
  padding: 20,
  height: "100%",
  display: "flex",
  flexDirection: "column",
} as const;
