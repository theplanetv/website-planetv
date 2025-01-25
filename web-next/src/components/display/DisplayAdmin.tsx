"use client";

import { Button, Pagination } from "@mantine/core";
import { JSX } from "react";
import { PlusCircle } from "lucide-react";

import "./DisplayAdmin.css";
import FormBlogTag from "@/components/form/FormBlogTag";
import TableDataAdmin from "@/components/table/TableDataAdmin";
import { GetTotalPage } from "@/libs/utils";
import { MenuAdminEnum } from "@/libs/enum";


type Props = {
  count: number;
  limit: number;
  data: any;
  menuChoose: MenuAdminEnum;
  showForm: boolean;
  handleShowForm: () => void;
  isSuccessLoadData: boolean;
};

export default function DisplayAdmin({
  count,
  limit,
  data,
  menuChoose,
  showForm,
  handleShowForm,
}: Props): JSX.Element {
  console.log(showForm);

  return (
    <>
      {showForm &&
        <FormBlogTag handleShowForm={handleShowForm} />
      }

      <div className="container">
        <div className="center">
          <Button leftSection={<PlusCircle />} onClick={() => handleShowForm()}>
            Add
          </Button>

          <TableDataAdmin data={data} menuChoose={menuChoose} />

          <Pagination total={GetTotalPage(count, limit)} />
        </div>
      </div>
    </>
  );
}
