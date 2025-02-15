export type BlogTag = {
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  created_at: Date;
  updated_at: Date;
  is_draft: boolean;
};

export function isBlogTag(tag: BlogTag | BlogPost): tag is BlogTag {
  return (tag as BlogTag).name !== undefined;
}

export function isBlogPost(post: BlogTag | BlogPost): post is BlogPost {
  return (post as BlogPost).title !== undefined;
}