import { useNavigate } from "react-router-dom";
import { Button } from "src/components/Button/Button.tsx";
import { ColDef, Table } from "src/components/Table/Table.tsx";
import { useQuery } from "@tanstack/react-query";
import { userQueries } from "src/modules/user/user.queries.ts";
import { useState } from "react";
import { Pagination } from "src/components/Pagination/Pagination.tsx";
import {
  userCreatePath,
  userShowPath,
} from "src/modules/user/user.constants.ts";

type UserRowModel = {
  id: string;
  name: string;
  email: string;
  role: string;
  actions: string;
};

const ActionCell = (_: any, row: UserRowModel) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(userShowPath.replace(":id", row.id));
      }}
    >
      Edit
    </button>
  );
};

const columns: ColDef<UserRowModel>[] = [
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
  {
    field: "role",
    name: "Role",
    width: 150,
  },
  {
    field: "actions",
    name: "Actions",
    width: 150,
    renderCell: ActionCell,
  },
] as const;

export function UserListRoute() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const { data: userData, isLoading } = useQuery(
    userQueries.list({
      page: {
        number: page,
        size: pageSize,
      },
    }),
  );

  const lastPage = userData?.meta.last_page ?? 1;
  const totalRows = userData?.meta?.total ?? 0;

  if (isLoading) {
    return "...loading";
  }

  const rows = (userData?.data || []).map((resource) => ({
    id: resource.id,
    name: resource.name,
    email: resource.email,
    role: resource.role,
    actions: "",
  }));

  const goToCreatePage = () => {
    navigate(userCreatePath);
  };

  return (
    <div>
      <div style={toolbarStyles}>
        <Button onClick={goToCreatePage}>create new user</Button>
        <div style={paginationContainer}>
          <ShowingRecordsRangeText
            page={page}
            pageSize={pageSize}
            totalRows={totalRows}
          />
          <Pagination page={page} max={lastPage} onPageChange={setPage} />
        </div>
      </div>
      <div style={tableContainerStyles}>
        <Table columns={columns} rows={rows} />
      </div>
    </div>
  );
}

const ShowingRecordsRangeText = ({
  page,
  pageSize,
  totalRows,
}: {
  page: number;
  pageSize: number;
  totalRows: number;
}) => {
  const start = Math.min(Math.max(page - 1, 0) * pageSize + 1, totalRows);
  const end = Math.min(page * pageSize, totalRows);
  const range = [start, end];
  return (
    <div>
      Showing {range.join("-")} records out of {totalRows}
    </div>
  );
};

const paginationContainer = {
  display: "flex",
  gap: 10,
};

const toolbarStyles = {
  display: "flex",
  justifyContent: "space-between",
};

const tableContainerStyles = {
  marginTop: 10,
};
