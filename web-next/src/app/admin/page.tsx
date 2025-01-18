"use client";

import { Burger, Center, Flex, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { JSX, useEffect, useState } from "react";

import { MenuAdminEnum } from "@/libs/enum";
import MenuAdmin from "@/components/MenuAdmin";

import { verify } from "@/libs/api/auth";

export default function Admin(): JSX.Element {
  const router = useRouter();

  const [menuChoose, setMenuChoose] = useState<MenuAdminEnum>(MenuAdminEnum.TAG);
  const [isVisible, { toggle }] = useDisclosure(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const responseResult = await verify();
      if (responseResult === false) {
        router.push("/login");
      } else {
        setIsLoading(false);
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
    <Flex>
      <div>
        <Burger opened={isVisible} onClick={toggle} aria-label="Toggle navigation" />
        <MenuAdmin isVisible={isVisible} menuChoose={menuChoose} setMenuChoose={setMenuChoose} />
      </div>


    </Flex>
  );
}
