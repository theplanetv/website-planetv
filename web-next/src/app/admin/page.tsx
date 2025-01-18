"use client";

import { Burger, Flex } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { JSX, useEffect, useState } from "react";

import { MenuAdminEnum } from "@/libs/enum";
import MenuAdmin from "@/components/MenuAdmin";

export default function Admin(): JSX.Element {
  const [menuChoose, setMenuChoose] = useState<MenuAdminEnum>(MenuAdminEnum.TAG);
  const [isVisible, { toggle }] = useDisclosure(true);

  useEffect(() => {
    
  }, []);

  return (
    <Flex>
      <div>
        <Burger opened={isVisible} onClick={toggle} aria-label="Toggle navigation" />
        <MenuAdmin isVisible={isVisible} menuChoose={menuChoose} setMenuChoose={setMenuChoose} />
      </div>


    </Flex>
  );
}
