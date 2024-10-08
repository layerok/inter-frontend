import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Button/Button.tsx";
import { userModule } from "src/modules/user/user.module.ts";
import { Table } from "src/components/Table/Table.tsx";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "src/modules/user/user.queries.ts";

export function UserListRoute() {
  const navigate = useNavigate();
  const { data: userData, isLoading } = useQuery({
    ...userQueries.list({}),
  });

  if (isLoading) {
    return "...loading";
  }

  const rows = (userData?.data || []).map((resource) => ({
    id: resource.id,
    name: resource.name,
    email: resource.email,
  }));

  return (
    <div>
      <div>
        <Button
          onClick={() => {
            navigate(userModule.routes.create.path);
          }}
        >
          create new user
        </Button>
      </div>
      <div
        style={{
          marginTop: 10,
        }}
      >
        <Table
          onRowClick={(row) => {
            navigate(
              userModule.routes.show.path.replace(":id", String(row.id)),
            );
          }}
          columns={[
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
          ]}
          rows={rows}
        />
      </div>
    </div>
  );
}
