"use client";

import { Pagination } from "@mantine/core";
import { JSX } from "react";

import "./DisplayAdmin.css";
import TableDataAdmin from "@/components/table/TableDataAdmin";
import { GetTotalPage } from "@/libs/utils";

type Props = {
  count: number;
  limit: number;
  isSuccessLoadData: boolean;
};

export default function DisplayAdmin({ count, limit }: Props): JSX.Element {
  return (
    <div className="container">
      <div className="center">
        <TableDataAdmin />

        <Pagination total={GetTotalPage(count, limit)} />
      </div>
    </div>
  );
}
