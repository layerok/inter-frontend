import { useNavigate, useParams } from "react-router-dom";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueries } from "src/admin/modules/user/user.queries.ts";
import { userMutations } from "src/admin/modules/user/user.mutations.ts";
import {
  userListPath,
  UserRoles,
} from "src/admin/modules/user/user.constants.ts";
import { Button } from "src/components/Button/Button.tsx";

export function UserCreateRoute() {
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
    setRole(e.currentTarget.value);
  };

  const { mutate: createUser } = useMutation({
    ...userMutations.createDetail,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: userQueries.lists(),
        refetchType: "all",
      });
    },
  });

  const handleCreate = () => {
    createUser(
      {
        params: {
          user: params.id!,
        },
        data: {
          name,
          email,
          password,
          role,
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

  return (
    <div style={rootStyle}>
      <form style={formStyles} onSubmit={handleFormSubmit}>
        <div style={controlStyle}>
          <label style={labelStyle}>Name</label>
          <input
            placeholder={"name"}
            name={"name"}
            value={name}
            onChange={handleNameChange}
          />
        </div>
        <div style={controlStyle}>
          <label style={labelStyle}>Email</label>
          <input
            placeholder={"email"}
            name={"email"}
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div style={controlStyle}>
          <label style={labelStyle}>Password</label>
          <input
            placeholder={"password"}
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
        <Button skin="success" onClick={handleCreate}>
          Create
        </Button>
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

const rootStyle = {
  padding: 20,
};

const formStyles = {
  width: 150,
  gap: 10,
  display: "flex",
  flexDirection: "column",
} as const;
