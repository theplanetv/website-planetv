"use client";

import { Burger, Center, Group, Loader, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

import "./page.css";

import DisplayAdmin from "@/components/display/DisplayAdmin";
import FormBlogTag from "@/components/form/FormBlogTag";
import MenuAdmin from "@/components/menu/MenuAdmin";

import { verify } from "@/libs/api/auth";
import blogtag from "@/libs/api/blogtag";
import { FormStatusEnum, MenuAdminEnum } from "@/libs/enum";

export default function Admin(): JSX.Element {
  const router = useRouter();

  // App State (only event trigger)
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccessLoadData, setIsSuccessLoadData] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

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
    if (refresh) {
      const fetchData = async () => {
        const resultCount = await blogtag.Count(search);
        if (resultCount.success === true) {
          setCount(resultCount.data);
          setIsSuccessLoadData(true);
        }

        const resultData = await blogtag.GetData(search, limit, page);
        if (resultData.success === true) {
          setData(resultData.data);
          setIsSuccessLoadData(true);
        }
      };
      fetchData();
      setRefresh(false);
    }
  }, [refresh === true]);

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
        <FormBlogTag
          handleRefreshToTrue={handleRefreshToTrue}
          formStatus={formStatus} handleFormStatus={handleFormStatus}
        />
      )}

      <DisplayAdmin
        count={count}
        limit={limit}
        data={data}
        menuChoose={menuChoose}
        handleFormStatus={handleFormStatus}
        isSuccessLoadData={isSuccessLoadData}
      />
    </Group>
  );
}
