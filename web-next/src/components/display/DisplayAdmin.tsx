"use client";

import { Pagination } from "@mantine/core";
import { JSX } from "react";

import "./DisplayAdmin.css";
import { GetTotalPage } from "@/libs/utils";

type Props = {
  count: number
  limit: number
  isSuccessLoadData: boolean
}

export default function DisplayAdmin({
  count,
  limit,
}: Props): JSX.Element {
  return (
    <div className="container">
      <Pagination total={GetTotalPage(count, limit)} />
    </div>
  );
}