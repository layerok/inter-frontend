import { useNavigate, useParams } from "react-router-dom";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueries } from "src/admin/modules/user/user.queries.ts";
import { userMutations } from "src/admin/modules/user/user.mutations.ts";
import {
  userListPath,
  UserRoles,
} from "src/admin/modules/user/user.constants.ts";

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
    <div>
      <form style={formStyles} onSubmit={handleFormSubmit}>
        <input
          placeholder={"name"}
          name={"name"}
          value={name}
          onChange={handleNameChange}
        />
        <input
          placeholder={"email"}
          name={"email"}
          value={email}
          onChange={handleEmailChange}
        />
        <input
          placeholder={"password"}
          name={"password"}
          value={password}
          onChange={handlePasswordChange}
        />
        <select name={"role"} value={role} onChange={handleRoleChange}>
          <option value={""}>Select role</option>
          {[UserRoles.Admin, UserRoles.Moderator].map((role) => (
            <option value={role}>{role}</option>
          ))}
        </select>
        <button onClick={handleCreate}>Create</button>
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
