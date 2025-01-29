"use client";

import { Button, Group, Input, Stack, Text, Title } from "@mantine/core";
import { JSX, useState } from "react";

import "./FormBlogTag.css";
import blogtag from "@/libs/api/blogtag";
import { BlogTag } from "@/libs/types";
import { FormStatusEnum } from "@/libs/enum";

type Props = {
  handleRefreshToTrue: () => void;
  handleFormStatus: (status: FormStatusEnum) => void;
};

export default function FormBlogTag({
  handleRefreshToTrue,
  handleFormStatus,
}: Props): JSX.Element {
  const [inputData, setInputData] = useState<BlogTag>({
    id: "",
    name: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result = await blogtag.Create(inputData);
    if (result.success === false) {
      alert("Create data failed!");
      return;
    }

    alert("Create data success");
    handleFormStatus(FormStatusEnum.NONE);
    handleRefreshToTrue();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  return (
    <Stack align="center" justify="center" className="form-container">
      <form onSubmit={handleSubmit}>
        <Stack
          align="center"
          justify="center"
          gap="md"
          className="form-display"
        >
          <Title order={1}>Manage Tag</Title>

          <Group gap="md">
            <Text>Name:</Text>
            <Input value={inputData?.name} onChange={handleNameChange} />
          </Group>

          <Group
            justify="space-between"
            gap="md"
            className="form-button-container"
          >
            <Button type="submit">Save</Button>
            <Button
              type="button"
              onClick={() => handleFormStatus(FormStatusEnum.NONE)}
            >
              Close
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}
