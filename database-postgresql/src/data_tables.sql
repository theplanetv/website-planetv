CREATE TABLE public.blog_tag (
    id   UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    name TEXT
);

CREATE TABLE public.blog_file (
    id           UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    filename     TEXT,
    created_date DATE DEFAULT NOW(),
    updated_date DATE DEFAULT NOW()
);

CREATE TABLE public.blog_file_depend_tag (
    id          UUID PRIMARY KEY DEFAULT GEN_RANDOM_UUID(),
    blogtag_id  UUID,
    blogfile_id UUID,
    CONSTRAINT fk_tag_for_blog_file_depend_tag
        FOREIGN KEY (blogtag_id)
        REFERENCES public.blog_tag(id),
    CONSTRAINT fk_file_for_blog_file_depend_tag
        FOREIGN KEY (blogfile_id)
        REFERENCES public.blog_file(id)
);