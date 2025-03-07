import { JSX } from "react";
import { NavLink } from "@mantine/core";
import { ClipboardList, FolderDot, House, UserRound } from "lucide-react";

import { MenuEnum } from "@/libs/enum";
import { toTitleCase } from "@/libs/string";

type Props = {
  isVisible: boolean;
  menuChoose: MenuEnum;
  setMenuChoose: (menuChoose: MenuEnum) => void;
};

export default function Menu({
  isVisible,
  menuChoose,
  setMenuChoose,
}: Props): JSX.Element {
  return (
    <>
      {isVisible && (
        <nav className="menu">
          <NavLink
            href="/"
            label={toTitleCase(MenuEnum.HOME.toString())}
            leftSection={<House />}
            variant="filled"
            active={menuChoose == MenuEnum.HOME}
            onClick={() => setMenuChoose(MenuEnum.HOME)}
          />
          <NavLink
            href="/about"
            label={toTitleCase(MenuEnum.ABOUT.toString())}
            leftSection={<UserRound />}
            variant="filled"
            active={menuChoose == MenuEnum.ABOUT}
            onClick={() => setMenuChoose(MenuEnum.ABOUT)}
          />
          <NavLink
            href="/projects"
            label={toTitleCase(MenuEnum.PROJECTS.toString())}
            leftSection={<FolderDot />}
            variant="filled"
            active={menuChoose == MenuEnum.PROJECTS}
            onClick={() => setMenuChoose(MenuEnum.PROJECTS)}
          />
          <NavLink
            href="/blogs"
            label={toTitleCase(MenuEnum.BLOGS.toString())}
            leftSection={<ClipboardList />}
            variant="filled"
            active={menuChoose == MenuEnum.BLOGS}
            onClick={() => setMenuChoose(MenuEnum.BLOGS)}
          />
        </nav>
      )}
    </>
  );
}
