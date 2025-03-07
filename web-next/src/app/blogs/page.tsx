"use client";

import { Burger, Title, Text, Stack, Group, ScrollArea } from "@mantine/core";
import { JSX, useEffect, useState } from "react";

import "./page.css"

import Menu from "@/components/menu/Menu";
import { useDisclosure } from "@mantine/hooks";
import { MenuEnum } from "@/libs/enum";
import blogtag from "@/libs/api/blogtag";
import blogpost from "@/libs/api/blogpost";
import { BlogPost } from "@/libs/types";

export default function Home(): JSX.Element {
  const [menuChoose, setMenuChoose] = useState<MenuEnum>(MenuEnum.BLOGS);
  const [isVisible, { toggle }] = useDisclosure(true);
  const [isSuccessLoadData, setIsSuccessLoadData] = useState(false);
  const [countTags, setCountTags] = useState(0);
  const [dataTags, setDataTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch tag count
        const resultBlogTagCount = await blogtag.Count("");
        if (resultBlogTagCount.success) {
          setCountTags(resultBlogTagCount.data);
        }

        // Fetch all tags
        const resultBlogTagData = await blogtag.GetAll("", limit, page);
        if (resultBlogTagData.success) {
          setDataTags(resultBlogTagData.data);
        }

        // Fetch blog posts
        const resultBlogPostData = await blogpost.GetAll("", "", limit, page);
        if (resultBlogPostData.success) {
          setPosts(resultBlogPostData.data);
          setIsSuccessLoadData(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [limit, page]);

  return (
    <Group className="page">
      <Stack className="menu-container">
        <Burger opened={isVisible} onClick={toggle} aria-label="Toggle navigation" />
        <Menu isVisible={isVisible} menuChoose={menuChoose} setMenuChoose={setMenuChoose} />
      </Stack>

      <Title className="text-center" order={1}>My blog posts</Title>

      <ScrollArea h={500} className="scroll-area">
        {isSuccessLoadData ? (
          <Stack>
            {posts.map((post: BlogPost) => (
              <Stack key={post.id} className="box-container" gap="md">
                <Title className="text-center" order={3}>{post.title}</Title>
                <Group gap="md">
                  <Text size="sm">Created at: {new Date(post.created_at).toLocaleDateString()}</Text>
                  <Text size="sm">Updated at: {new Date(post.updated_at).toLocaleDateString()}</Text>
                </Group>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Text>Loading...</Text>
        )}
      </ScrollArea>
    </Group>
  );
}
