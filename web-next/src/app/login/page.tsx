"use client";

import { Center, Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import "./login.css";
import LoginForm from "@/components/LoginForm";
import { verify } from "@/libs/api/auth";

export default function Login() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const responseResult = await verify();
      if (responseResult === true) {
        router.push("/admin");
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
    <Center className="container">
      <LoginForm />
    </Center>
  );
}
