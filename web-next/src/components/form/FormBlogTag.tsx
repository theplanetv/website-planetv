"use client";

import { Button, Flex, Input } from "@mantine/core";
import { JSX, useState } from "react";

import "./FormBlogTag.css"
import blogtag from "@/libs/api/blogtag";
import { BlogTag } from "@/libs/types";

type Props = {
  handleShowForm: () => void;
}

export default function FormBlogTag({ handleShowForm }: Props): JSX.Element {
  const [inputData, setInputData] = useState<BlogTag>({
    id: "",
    name: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const result = blogtag.Create(inputData);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <Input value={inputData?.name} onChange={handleNameChange} />
        <Flex>
          <Button type="button" onClick={handleShowForm}>Close</Button>
          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </div>
  );
}