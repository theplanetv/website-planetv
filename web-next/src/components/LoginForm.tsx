"use client";

import { Button, Input, PasswordInput, Stack, Title } from "@mantine/core";
import { FormEvent, JSX, useState } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/libs/api/auth";

export default function Login(): JSX.Element {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const submitLogin = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    const responseResult = await login(username, password);
    if (responseResult === true) {
      router.push("/admin");
    }
  };

  return (
    <form onSubmit={submitLogin}>
      <Stack>
        <Title order={1} className="header">
          Login
        </Title>

        <Input
          placeholder="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />

        <PasswordInput
          placeholder="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <Button variant="filled" type="submit">
          Login
        </Button>
      </Stack>
    </form>
  );
}
