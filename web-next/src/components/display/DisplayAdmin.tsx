"use client";

import { Button, Pagination, Stack } from "@mantine/core";
import { JSX } from "react";
import { PlusCircle } from "lucide-react";

import "./DisplayAdmin.css";
import TableDataAdmin from "@/components/table/TableDataAdmin";
import { GetTotalPage } from "@/libs/utils";
import { MenuAdminEnum } from "@/libs/enum";

type Props = {
  count: number;
  limit: number;
  data: any;
  menuChoose: MenuAdminEnum;
  handleShowForm: () => void;
  isSuccessLoadData: boolean;
};

export default function DisplayAdmin({
  count,
  limit,
  data,
  menuChoose,
  handleShowForm,
}: Props): JSX.Element {
  return (
    <Stack justify="center" align="center" className="display-container">
      <Button leftSection={<PlusCircle />} onClick={() => handleShowForm()}>
        Add
      </Button>

      <TableDataAdmin data={data} menuChoose={menuChoose} />

      <Pagination total={GetTotalPage(count, limit)} />
    </Stack>
  );
}
