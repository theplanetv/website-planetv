"use client";

import { Button, Group, Pagination, Stack } from "@mantine/core";
import { JSX } from "react";
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
  handleFormStatus: (status: FormStatusEnum) => void;
  isSuccessLoadData: boolean;
};

export default function DisplayAdmin({
  count,
  limit,
  data,
  menuChoose,
  handleFormStatus,
}: Props): JSX.Element {
  return (
    <Group justify="center" align="center" className="display-container">
      <Stack justify="center" align="center">
        <Button
          leftSection={<PlusCircle />}
          onClick={() => handleFormStatus(FormStatusEnum.CREATE)}
        >
          Add
        </Button>

        <TableDataAdmin data={data} menuChoose={menuChoose} handleFormStatus={handleFormStatus} />

        <Pagination total={GetTotalPage(count, limit)} />
      </Stack>
    </Group>
  );
}
