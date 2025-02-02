"use client";

import { Button, Group, Input, Stack, Text, Title } from "@mantine/core";
import { JSX, useEffect, useState } from "react";

import "./FormBlogTag.css";
import blogtag from "@/libs/api/blogtag";
import { BlogTag } from "@/libs/types";
import { FormStatusEnum } from "@/libs/enum";

type Props = {
  handleRefreshToTrue: () => void;
  formStatus: FormStatusEnum;
  handleFormStatus: (status: FormStatusEnum) => void;
  inputFormData: BlogTag | undefined;
};

export default function FormBlogTag({
  handleRefreshToTrue,
  formStatus,
  handleFormStatus,
  inputFormData,
}: Props): JSX.Element {
  const [inputData, setInputData] = useState<BlogTag>({
    id: "",
    name: "",
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formStatus === FormStatusEnum.CREATE) {
      const result = await blogtag.Create(inputData);
      if (result.success === false) {
        alert("Create data failed!");
        return;
      }

      alert("Create data success");
      handleFormStatus(FormStatusEnum.NONE);
      handleRefreshToTrue();
    } else if (formStatus === FormStatusEnum.UPDATE) {
      const result = await blogtag.Update(inputData);
      if (result.success === false) {
        alert("Update data failed!");
        return;
      }

      alert("Update data success");
      handleFormStatus(FormStatusEnum.NONE);
      handleRefreshToTrue();
    } else if (formStatus === FormStatusEnum.REMOVE) {
      const result = await blogtag.Remove(inputData.id);
      if (result.success === false) {
        alert("Remove data failed!");
        return;
      }

      alert("Remove data success");
      handleFormStatus(FormStatusEnum.NONE);
      handleRefreshToTrue();
    }
  };

  useEffect(() => {
    if (inputFormData) {
      setInputData(inputFormData);
    }
  }, [inputFormData]);

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
          <Title order={1}>
            {formStatus === FormStatusEnum.CREATE && "Create"}
            {formStatus === FormStatusEnum.UPDATE && "Update"}
            {formStatus === FormStatusEnum.REMOVE && "Remove"}
            Tag
          </Title>

          {formStatus !== FormStatusEnum.REMOVE &&
            <Group gap="md">
              <Text>Name:</Text>
              <Input value={inputData?.name} onChange={handleNameChange} />
            </Group>
          }

          {formStatus === FormStatusEnum.REMOVE &&
            <Group justify="center" align="center">
              <p>Are you sure you want to remove data? This action can't be undo.</p>
            </Group>
          }

          <Group
            justify="space-between"
            gap="md"
            className="form-button-container"
          >
            {formStatus === FormStatusEnum.CREATE &&
              <Button color="green" type="submit">
                Create
              </Button>
            }

            {formStatus === FormStatusEnum.UPDATE &&
              <Button type="submit">
                Update
              </Button>
            }

            {formStatus === FormStatusEnum.REMOVE &&
              <Button color="red" type="submit">
                Remove
              </Button>
            }

            <Button
              type="button"
              onClick={() => handleFormStatus(FormStatusEnum.NONE)}
            >
              Cancel
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}
