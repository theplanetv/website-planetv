import { JSX } from "react";
import { NavLink } from '@mantine/core';
import { Tag, File } from "lucide-react";

import { MenuAdminEnum } from "@/libs/enum";

type Props = {
  isVisible: boolean;
  menuChoose: MenuAdminEnum;
  setMenuChoose: (menuChoose: MenuAdminEnum) => void;
}

export default function Menu({ isVisible, menuChoose, setMenuChoose }: Props): JSX.Element {
  return (
    <>
      {isVisible && (
        <nav>
          <NavLink
            href="#"
            label="Tags"
            leftSection={<Tag />}
            variant="filled"
            active={menuChoose == MenuAdminEnum.TAG}
            onClick={() => setMenuChoose(MenuAdminEnum.TAG)}
          />
          <NavLink
            href="#"
            label="Files"
            leftSection={<File />}
            variant="filled"
            active={menuChoose == MenuAdminEnum.FILE}
            onClick={() => setMenuChoose(MenuAdminEnum.FILE)}
          />
        </nav>
      )}
    </>
  );
}