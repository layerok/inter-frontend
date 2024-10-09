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
import { Button } from "src/components/Button/Button.tsx";

type FormValues = {
  name: string;
  email: string;
  password: string;
  role: string;
};

export function UserShowRoute() {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const id = searchParams.get(UserQueryParams.Id);

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange: ChangeEventHandler<any> = (e) => {
    const name = (e.currentTarget || e.target).name;
    const value = (e.currentTarget || e.target).value;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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
      setValues((prev) => ({
        ...prev,
        ...userData.data,
      }));
    }
  }, [userData]);

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
        data: values,
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
          <input name={"name"} value={values.name} onChange={handleChange} />
        </div>
        <div style={controlStyle}>
          <label style={labelStyle}>Email</label>
          <input name={"email"} value={values.email} onChange={handleChange} />
        </div>

        <div style={controlStyle}>
          <label style={labelStyle}>Password</label>
          <input
            name={"password"}
            value={values.password}
            onChange={handleChange}
          />
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
        </div>
        <Button skin={"success"} onClick={handleUpdate}>
          Save
        </Button>
        <Button skin={"danger"} onClick={handleDelete}>
          Delete
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
