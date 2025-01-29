"use client";

import { Button, Group, Input, Pagination, Stack } from "@mantine/core";
import { Dispatch, JSX, SetStateAction, useState } from "react";
import { PlusCircle } from "lucide-react";

import "./DisplayAdmin.css";
import TableDataAdmin from "@/components/table/TableDataAdmin";
import { GetTotalPage } from "@/libs/utils";
import { FormStatusEnum, MenuAdminEnum } from "@/libs/enum";

type Props = {
  count: number;
  limit: number;
  data: any;
  menuChoose: MenuAdminEnum;
  setSearch: Dispatch<SetStateAction<string>>;
  setPage: Dispatch<SetStateAction<number>>;
  handleFormStatus: (status: FormStatusEnum) => void;
  isSuccessLoadData: boolean;
};

export default function DisplayAdmin({
  count,
  limit,
  data,
  menuChoose,
  setSearch,
  setPage,
  handleFormStatus,
}: Props): JSX.Element {
  const [searchInput, setSearchInput] = useState("");

  return (
    <Group justify="center" align="center" className="display-container">
      <Stack justify="center" align="center">
        <Group>
          <Input
            placeholder="Search..."
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event?.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                setSearch(searchInput);
              }
            }}
          />

          <Button
            color="green"
            size="compact-md"
            onClick={() => handleFormStatus(FormStatusEnum.CREATE)}
          >
            <PlusCircle size={18} />
          </Button>
        </Group>

        <TableDataAdmin
          data={data}
          menuChoose={menuChoose}
          handleFormStatus={handleFormStatus}
        />

        <Pagination total={GetTotalPage(count, limit)} onChange={setPage} />
      </Stack>
    </Group>
  );
}
