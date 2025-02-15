import { Dispatch, JSX, SetStateAction } from "react";
import { Table } from "@mantine/core";

import TableValueAdmin from "@/components/table/TableValueAdmin";
import { FormStatusEnum, MenuAdminEnum } from "@/libs/enum";
import { BlogPost, BlogTag } from "@/libs/types";

type Props = {
  data: any;
  menuChoose: MenuAdminEnum;
  setInputFormData: Dispatch<SetStateAction<BlogTag | BlogPost | undefined>>;
  handleFormStatus: (status: FormStatusEnum) => void;
};

export default function TableDataAdmin({
  data,
  menuChoose,
  setInputFormData,
  handleFormStatus,
}: Props): JSX.Element {
  return (
    <Table>
      <Table.Thead>
        {menuChoose === MenuAdminEnum.TAG && (
        <Table.Tr>
          <Table.Th>Index</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
        )}
        {menuChoose === MenuAdminEnum.POST && (
        <Table.Tr>
          <Table.Th>Index</Table.Th>
          <Table.Th>Title</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
        )}
      </Table.Thead>

      <Table.Tbody>
        <TableValueAdmin
          data={data}
          menuChoose={menuChoose}
          setInputFormData={setInputFormData}
          handleFormStatus={handleFormStatus}
        />
      </Table.Tbody>
    </Table>
  );
}
