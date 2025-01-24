import { JSX } from "react";
import { Table } from "@mantine/core";
import TableValueAdmin from "@/components/table/TableValueAdmin";
import { MenuAdminEnum } from "@/libs/enum";

type Props = {
  data: any;
  menuChoose: MenuAdminEnum;
};

export default function TableDataAdmin({ data, menuChoose }: Props): JSX.Element {

  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Index</Table.Th>
          <Table.Th>Name</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        <TableValueAdmin data={data} menuChoose={menuChoose} />
      </Table.Tbody>
    </Table>
  );
}
