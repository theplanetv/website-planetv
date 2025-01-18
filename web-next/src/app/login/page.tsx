import { Center } from "@mantine/core";
import { JSX } from "react";

import "./login.css";
import LoginForm from "@/components/LoginForm";

export default function Login(): JSX.Element {
  return (
    <Center className="container">
      <LoginForm />
    </Center>
  );
}
