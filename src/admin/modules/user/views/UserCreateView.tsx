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
import axios from "axios";

type FormValues = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export function UserCreateRoute() {
  const params = useParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState<Partial<FormValues>>({
    name: undefined,
    email: undefined,
    password: undefined,
    role: undefined,
  });

  const handleChange: ChangeEventHandler<any> = (e) => {
    const name = (e.currentTarget || e.target).name;
    const value = (e.currentTarget || e.target).value;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const { mutate: createUser } = useMutation({
    ...userMutations.createDetail,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: userQueries.lists(),
        refetchType: "all",
      });
    },
    onError: (e) => {
      if (!axios.isAxiosError(e)) {
        return;
      }
      const errors = e.response?.data.errors || {};
      const err = Object.keys(errors).reduce(
        (acc, field) => ({
          ...acc,
          [field]: errors[field][0],
        }),
        {},
      );
      console.log(err, errors);

      setErrors(err);
    },
  });

  const handleCreate = () => {
    createUser(
      {
        params: {
          user: params.id!,
        },
        data: values,
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
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && <span style={errorStyle}>{errors.name}</span>}
        </div>
        <div style={controlStyle}>
          <label style={labelStyle}>Email</label>
          <input
            placeholder={"email"}
            name={"email"}
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <span style={errorStyle}>{errors.email}</span>}
        </div>

        <div style={controlStyle}>
          <label style={labelStyle}>Password</label>
          <input
            placeholder={"password"}
            name={"password"}
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <span style={errorStyle}>{errors.password}</span>}
        </div>
        <div style={controlStyle}>
          <label style={labelStyle}>Role</label>
          <select name={"role"} value={values.role} onChange={handleChange}>
            <option value={""}>Select role</option>
            {[UserRoles.Admin, UserRoles.Moderator].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          {errors.role && <span style={errorStyle}>{errors.role}</span>}
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

const errorStyle = {
  color: "red",
  fontSize: 10,
};

const formStyles = {
  width: 150,
  gap: 10,
  display: "flex",
  flexDirection: "column",
} as const;
