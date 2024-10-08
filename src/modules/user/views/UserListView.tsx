import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Button/Button.tsx";
import { userModule } from "src/modules/user/user.module.ts";
import { Table, ValidRowModel } from "src/components/Table/Table.tsx";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "src/modules/user/user.queries.ts";

const columns = [
  {
    field: "id",
    name: "ID",
    width: 40,
  },
  {
    field: "name",
    name: "Name",
    width: 150,
  },
  {
    field: "email",
    name: "Email",
    width: 150,
  },
] as const;

export function UserListRoute() {
  const navigate = useNavigate();
  const { data: userData, isLoading } = useQuery(userQueries.list({}));

  if (isLoading) {
    return "...loading";
  }

  const rows = (userData?.data || []).map((resource) => ({
    id: resource.id,
    name: resource.name,
    email: resource.email,
  }));

  const handleRowClick = (row: ValidRowModel) => {
    navigate(userModule.routes.show.path.replace(":id", String(row.id)));
  };

  const goToCreatePage = () => {
    navigate(userModule.routes.create.path);
  };

  return (
    <div>
      <div>
        <Button onClick={goToCreatePage}>create new user</Button>
      </div>
      <div style={tableContainerStyles}>
        <Table onRowClick={handleRowClick} columns={columns} rows={rows} />
      </div>
    </div>
  );
}

const tableContainerStyles = {
  marginTop: 10,
};
