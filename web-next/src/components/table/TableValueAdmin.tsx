import { Dispatch, JSX, SetStateAction } from "react";
import { Button, Group, Table } from "@mantine/core";
import { Edit, Trash } from "lucide-react";

import { FormStatusEnum, MenuAdminEnum } from "@/libs/enum";
import { BlogPost, BlogTag } from "@/libs/types";

type Props = {
  data: any;
  menuChoose: MenuAdminEnum;
  setInputFormData: Dispatch<SetStateAction<BlogTag | BlogPost | undefined>>;
  handleFormStatus: (status: FormStatusEnum) => void;
};

export default function TableValueAdmin({
  data,
  menuChoose,
  setInputFormData,
  handleFormStatus,
}: Props): JSX.Element {
  let rows: JSX.Element = <div></div>;

  if (menuChoose === MenuAdminEnum.TAG && data.length > 0) {
    rows = data.map((item: BlogTag, index: number) => (
      <Table.Tr key={item.id}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{item.name}</Table.Td>
        <Table.Td>
          <Group gap="xs">
            <Button
              size="compact-md"
              onClick={() => {
                handleFormStatus(FormStatusEnum.UPDATE);
                setInputFormData(item);
              }}
            >
              <Edit size={18} />
            </Button>

            <Button
              color="red"
              size="compact-md"
              onClick={() => {
                handleFormStatus(FormStatusEnum.REMOVE);
                setInputFormData(item);
              }}
            >
              <Trash size={18} />
            </Button>
          </Group>
        </Table.Td>
      </Table.Tr>
    ));
  } else if (menuChoose === MenuAdminEnum.POST && data.length > 0) {
    rows = data.map((item: BlogPost, index: number) => (
      <Table.Tr key={item.id}>
        <Table.Td>{index + 1}</Table.Td>
        <Table.Td>{item.title}</Table.Td>
        <Table.Td>
          <Group gap="xs">
            <Button
              size="compact-md"
              onClick={() => {
                const formattedItem = {
                  ...item,
                  created_at: item.created_at ? new Date(item.created_at) : new Date(),
                  updated_at: item.updated_at ? new Date(item.updated_at) : new Date(),
                  is_draft: Boolean(item.is_draft)
                };
                handleFormStatus(FormStatusEnum.UPDATE);
                setInputFormData(formattedItem);
              }}
            >
              <Edit size={18} />
            </Button>

            <Button
              color="red"
              size="compact-md"
              onClick={() => {
                handleFormStatus(FormStatusEnum.REMOVE);
                setInputFormData(item);
              }}
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
