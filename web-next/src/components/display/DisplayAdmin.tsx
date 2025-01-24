"use client";

import { Pagination } from "@mantine/core";
import { JSX } from "react";

import "./DisplayAdmin.css";
import TableDataAdmin from "@/components/table/TableDataAdmin";
import { GetTotalPage } from "@/libs/utils";
import { MenuAdminEnum } from "@/libs/enum";

type Props = {
  count: number;
  limit: number;
  data: any;
  menuChoose: MenuAdminEnum;
  isSuccessLoadData: boolean;
};

export default function DisplayAdmin({ count, limit, data, menuChoose }: Props): JSX.Element {
  return (
    <div className="container">
      <div className="center">
        <TableDataAdmin data={data} menuChoose={menuChoose} />

        <Pagination total={GetTotalPage(count, limit)} />
      </div>
    </div>
  );
}
