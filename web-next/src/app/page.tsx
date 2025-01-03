"use client";

import { Burger, Center, Flex, Title } from '@mantine/core';
import { JSX, useState } from 'react';

import Menu from '@/components/Menu';
import { useDisclosure } from '@mantine/hooks';
import { MenuEnum } from '@/libs/enum';

export default function Home(): JSX.Element {
  const [menuChoose, setMenuChoose] = useState<MenuEnum>(MenuEnum.HOME);
  const [isVisible, { toggle }] = useDisclosure(true);

  return (
    <Flex>
      <div>
        <Burger opened={isVisible} onClick={toggle} aria-label="Toggle navigation" />
        <Menu isVisible={isVisible} menuChoose={menuChoose} setMenuChoose={setMenuChoose} />
      </div>

      <Title order={1}>Home</Title>
    </Flex>
  );
}
