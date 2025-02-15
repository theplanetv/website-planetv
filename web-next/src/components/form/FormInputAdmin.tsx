"use client";

import { Button, Checkbox, Group, Input, Stack, Text, Title } from "@mantine/core";
import { JSX, useEffect, useState } from "react";

import "./FormInputAdmin.css";
import blogtag from "@/libs/api/blogtag";
import blogpost from "@/libs/api/blogpost";
import { BlogPost, BlogTag, isBlogPost, isBlogTag } from "@/libs/types";
import { FormStatusEnum, MenuAdminEnum } from "@/libs/enum";
import { DatePickerInput, DateValue } from "@mantine/dates";

type Props = {
  handleRefreshToTrue: () => void;
  menuChoose: MenuAdminEnum;
  formStatus: FormStatusEnum;
  handleFormStatus: (status: FormStatusEnum) => void;
  inputFormData: BlogTag | BlogPost | undefined;
};

export default function FormInputAdmin({
  handleRefreshToTrue,
  menuChoose,
  formStatus,
  handleFormStatus,
  inputFormData,
}: Props): JSX.Element {
  const [inputData, setInputData] = useState<BlogTag | BlogPost>({
    id: "",
    name: "",
    title: "",
    slug: "",
    created_at: new Date(),
    updated_at: new Date(),
    is_draft: true,
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputData((prevData: BlogTag | BlogPost) => {
      if (isBlogTag(prevData)) {
        return { ...prevData, name: value };
      }
      return prevData;
    });
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputData((prevData: BlogTag | BlogPost) => {
      if (isBlogPost(prevData)) {
        return { ...prevData, title: value };
      }
      return prevData;
    });
  };

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputData((prevData: BlogTag | BlogPost) => {
      if (isBlogPost(prevData)) {
        return { ...prevData, slug: value };
      }
      return prevData;
    });
  };

  const handleCreatedAtChange = (value: DateValue) => {
    setInputData((prevData: BlogTag | BlogPost) => {
      if (isBlogPost(prevData)) {
        return { 
          ...prevData, 
          created_at: value ? new Date(value) : new Date() 
        };
      }
      return prevData;
    });
  };

  const handleUpdatedAtChange = (value: DateValue) => {
    setInputData((prevData: BlogTag | BlogPost) => {
      if (isBlogPost(prevData)) {
        return { 
          ...prevData, 
          updated_at: value ? new Date(value) : new Date() 
        };
      }
      return prevData;
    });
  };

  const handleIsDraftChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setInputData((prevData: BlogTag | BlogPost) => {
      if (isBlogPost(prevData)) {
        return { ...prevData, is_draft: checked };
      }
      return prevData;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isBlogTag(inputData)) {
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
    } else if (isBlogPost(inputData)) {
      if (formStatus === FormStatusEnum.CREATE) {
        const result = await blogpost.Create(inputData);
        if (result.success === false) {
          alert("Create data failed!");
          return;
        }

        alert("Create data success");
        handleFormStatus(FormStatusEnum.NONE);
        handleRefreshToTrue();
      } else if (formStatus === FormStatusEnum.UPDATE) {
        const result = await blogpost.Update(inputData);
        if (result.success === false) {
          alert("Update data failed!");
          return;
        }

        alert("Update data success");
        handleFormStatus(FormStatusEnum.NONE);
        handleRefreshToTrue();
      } else if (formStatus === FormStatusEnum.REMOVE) {
        const result = await blogpost.Remove(inputData.id);
        if (result.success === false) {
          alert("Remove data failed!");
          return;
        }

        alert("Remove data success");
        handleFormStatus(FormStatusEnum.NONE);
        handleRefreshToTrue();
      }
    }
  };

  useEffect(() => {
    // Reset inputData when formStatus is CREATE
    if (formStatus === FormStatusEnum.CREATE) {
      setInputData({
        id: "",
        name: "",
        title: "",
        slug: "",
        created_at: new Date(),
        updated_at: new Date(),
        is_draft: true,
      });
    } else if (inputFormData) {
      // If there's inputFormData, update the inputData to match it
      setInputData(inputFormData);
    }
  }, [formStatus, inputFormData])

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
            {formStatus === FormStatusEnum.CREATE && "Create "}
            {formStatus === FormStatusEnum.UPDATE && "Update "}
            {formStatus === FormStatusEnum.REMOVE && "Remove "}
            {menuChoose === MenuAdminEnum.TAG && "Tag"}
            {menuChoose === MenuAdminEnum.POST && "Post"}
          </Title>

          {/* BlogTag */}
          {formStatus !== FormStatusEnum.REMOVE && menuChoose === MenuAdminEnum.TAG && isBlogTag(inputData) &&
            <Group gap="md">
              <Text>Name:</Text>
              <Input value={inputData?.name} onChange={handleNameChange} />
            </Group>
          }

          {/* BlogPost */}
          {formStatus !== FormStatusEnum.REMOVE && menuChoose === MenuAdminEnum.POST && isBlogPost(inputData) &&
            <>
              <Group gap="md">
                <Text>Title:</Text>
                <Input value={inputData?.title} onChange={handleTitleChange} />
              </Group>

              <Group gap="md">
                <Text>Slug:</Text>
                <Input value={inputData?.slug} onChange={handleSlugChange} />
              </Group>

              <Group gap="md">
                <Text>Created at:</Text>
                <DatePickerInput 
                  dropdownType="modal" 
                  value={inputData?.created_at instanceof Date ? inputData.created_at : new Date(inputData?.created_at)} 
                  onChange={handleCreatedAtChange}
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                />
              </Group>

              <Group gap="md">
                <Text>Updated at:</Text>
                <DatePickerInput 
                  dropdownType="modal" 
                  value={inputData?.updated_at instanceof Date ? inputData.updated_at : new Date(inputData?.updated_at)} 
                  onChange={handleUpdatedAtChange}
                  valueFormat="YYYY-MM-DD HH:mm:ss"
                />
              </Group>

              <Group gap="md">
                <Checkbox checked={inputData?.is_draft} onChange={handleIsDraftChecked} />
                <Text>Is Draft</Text>
              </Group>
            </>
          }

          {formStatus === FormStatusEnum.REMOVE &&
            <Group justify="center" align="center">
              <p>Are you sure you want to remove this data? This action can't be undo.</p>
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
