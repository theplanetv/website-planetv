"use client";

import { Burger, Center, Group, Loader, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

import "./page.css";

import DisplayAdmin from "@/components/display/DisplayAdmin";
import FormInputAdmin from "@/components/form/FormInputAdmin";
import MenuAdmin from "@/components/menu/MenuAdmin";

import { verify } from "@/libs/api/auth";
import blogtag from "@/libs/api/blogtag";
import { FormStatusEnum, MenuAdminEnum } from "@/libs/enum";
import { BlogPost, BlogTag } from "@/libs/types";
import blogpost from "@/libs/api/blogpost";

export default function Admin(): JSX.Element {
  const router = useRouter();

  // App State (only event trigger)
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessLoadData, setIsSuccessLoadData] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [tags, setTags] = useState("");
  const [inputFormData, setInputFormData] = useState<BlogTag | BlogPost>();

  // User state (user can change status)
  const [menuChoose, setMenuChoose] = useState(MenuAdminEnum.TAG);
  const [isVisible, { toggle }] = useDisclosure(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [formStatus, setFormStatus] = useState(FormStatusEnum.NONE);

  const handleFormStatus = (status: FormStatusEnum) => {
    setFormStatus(status);
  };
  const handleRefreshToTrue = () => {
    setRefresh(true);
  };

  useEffect(() => {
    const fetchToVerify = async () => {
      const responseResult = await verify();
      if (responseResult === false) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    };
    fetchToVerify();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (menuChoose === MenuAdminEnum.TAG) {
        const resultCount = await blogtag.Count(search);
        if (resultCount.success === true) {
          setCount(resultCount.data);
          setIsSuccessLoadData(true);
        }

        const resultData = await blogtag.GetAll(search, limit, page);
        if (resultData.success === true) {
          setData(resultData.data);
          setIsSuccessLoadData(true);
        }
      } else if (menuChoose === MenuAdminEnum.POST) {
        const resultCount = await blogpost.Count(search);
        if (resultCount.success === true) {
          setCount(resultCount.data);
          setIsSuccessLoadData(true);
        }

        const resultData = await blogpost.GetAll(search, tags, limit, page);
        if (resultData.success === true) {
          setData(resultData.data);
          setIsSuccessLoadData(true);
        }
      }
    };
    fetchData();
    setRefresh(false);
  }, [menuChoose,refresh, search, page]);

  if (isLoading) {
    return (
      <Center className="container">
        <Loader size="lg" color="blue" />
      </Center>
    );
  }

  return (
    <Group className="page">
      <Stack>
        <Burger
          opened={isVisible}
          onClick={toggle}
          aria-label="Toggle navigation"
        />
        <MenuAdmin
          isVisible={isVisible}
          menuChoose={menuChoose}
          setMenuChoose={setMenuChoose}
        />
      </Stack>

      {formStatus !== FormStatusEnum.NONE && (
        <FormInputAdmin
          handleRefreshToTrue={handleRefreshToTrue}
          menuChoose={menuChoose}
          formStatus={formStatus}
          handleFormStatus={handleFormStatus}
          inputFormData={inputFormData}
        />
      )}

      <DisplayAdmin
        count={count}
        limit={limit}
        data={data}
        menuChoose={menuChoose}
        setSearch={setSearch}
        setPage={setPage}
        setInputFormData={setInputFormData}
        handleFormStatus={handleFormStatus}
        isSuccessLoadData={isSuccessLoadData}
      />
    </Group>
  );
}
