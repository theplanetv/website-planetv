import { JSX } from "react";
import { Button, Group, Table } from "@mantine/core";
import { Edit, Trash } from "lucide-react";

import { FormStatusEnum, MenuAdminEnum } from "@/libs/enum";
import { BlogTag } from "@/libs/types";

type Props = {
  data: any;
  menuChoose: MenuAdminEnum;
  handleFormStatus: (status: FormStatusEnum) => void;
};

export default function TableValueAdmin({
  data,
  menuChoose,
  handleFormStatus,
}: Props): JSX.Element {
  let rows: JSX.Element = <div></div>;

  if (menuChoose === MenuAdminEnum.TAG && data.length > 0) {
    rows = data.map((item: BlogTag, index: number) => (
      <Table.Tr key={item.name}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>
          <Group gap="xs">
            <Button
              size="compact-md"
              onClick={() => handleFormStatus(FormStatusEnum.UPDATE)}
            >
              <Edit size={18} />
            </Button>

            <Button
              color="red"
              size="compact-md"
              onClick={() => handleFormStatus(FormStatusEnum.REMOVE)}
            >
              <Trash size={18} />
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    ));
  } else {
    rows = (
      <Table.Tr>
        <Table.Td colSpan={3} style={{ textAlign: "center" }}>
          No data found
        </Table.Td>
      </Table.Tr>
    );
  }

  return rows;
}
