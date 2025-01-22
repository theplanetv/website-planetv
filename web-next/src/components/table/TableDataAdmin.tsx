import { JSX } from "react";
import { Table } from "@mantine/core";

export default function TableDataAdmin(): JSX.Element {
  return (
    <Table>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Index</Table.Th>
          <Table.Th>Name</Table.Th>
        </Table.Tr>
      </Table.Thead>
    </Table>
  );
}
