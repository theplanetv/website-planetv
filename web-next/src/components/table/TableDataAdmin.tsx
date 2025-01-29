import { JSX } from "react";
import { Table } from "@mantine/core";

import TableValueAdmin from "@/components/table/TableValueAdmin";
import { FormStatusEnum, MenuAdminEnum } from "@/libs/enum";

type Props = {
  data: any;
  menuChoose: MenuAdminEnum;
  handleFormStatus: (status: FormStatusEnum) => void;
};

export default function TableDataAdmin({
  data,
  menuChoose,
  handleFormStatus,
}: Props): JSX.Element {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Index</Table.Th>
          <Table.Th>Name</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <TableValueAdmin data={data} menuChoose={menuChoose} handleFormStatus={handleFormStatus} />
      </Table.Tbody>
    </Table>
  );
}
