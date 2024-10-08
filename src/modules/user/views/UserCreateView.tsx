import { useNavigate, useParams } from "react-router-dom";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { userQueries } from "src/modules/user/user.queries.ts";
import { userMutations } from "src/modules/user/user.mutations.ts";
import { userModule } from "src/modules/user/user.module.ts";

export function UserCreateRoute() {
  const params = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        },
      },
      {
        onSuccess: () => {
          navigate(userModule.routes.layout.path);
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
