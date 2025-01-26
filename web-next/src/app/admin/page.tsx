"use client";

import { Burger, Center, Group, Loader, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

import "./page.css";

import { MenuAdminEnum } from "@/libs/enum";
import MenuAdmin from "@/components/menu/MenuAdmin";

import { verify } from "@/libs/api/auth";
import blogtag from "@/libs/api/blogtag";
import DisplayAdmin from "@/components/display/DisplayAdmin";
import FormBlogTag from "@/components/form/FormBlogTag";

export default function Admin(): JSX.Element {
  const router = useRouter();

  const [menuChoose, setMenuChoose] = useState(MenuAdminEnum.TAG);
  const [isVisible, { toggle }] = useDisclosure(true);
  const [isLoading, setIsLoading] = useState(true);

  const [isSuccessLoadData, setIsSuccessLoadData] = useState(false);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  useEffect(() => {
    const fetchData = async () => {
      const responseResult = await verify();
      if (responseResult === false) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }

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
  }, []);

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

      {showForm && <FormBlogTag handleShowForm={handleShowForm} />}

      <DisplayAdmin
        count={count}
        limit={limit}
        data={data}
        menuChoose={menuChoose}
        handleShowForm={handleShowForm}
        isSuccessLoadData={isSuccessLoadData}
      />
    </Group>
  );
}
