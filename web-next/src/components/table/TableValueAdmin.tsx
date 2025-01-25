import { JSX } from "react";
import { Table } from "@mantine/core";

import { MenuAdminEnum } from "@/libs/enum";
import { BlogTag } from "@/libs/types";

type Props = {
  data: any;
  menuChoose: MenuAdminEnum;
};

export default function TableValueAdmin({
  data,
  menuChoose,
}: Props): JSX.Element {
  let rows: JSX.Element = <div></div>;

  if (menuChoose === MenuAdminEnum.TAG && data.length > 0) {
    rows = data.map((item: BlogTag, index: number) => (
      <Table.Tr key={item.name}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{item.name}</Table.Td>
      </Table.Tr>
    ));
  } else {
    rows = (
      <Table.Tr>
        <Table.Td colSpan={2} style={{ textAlign: "center" }}>
          No data found
        </Table.Td>
      </Table.Tr>
    );
  }

  return rows;
}
