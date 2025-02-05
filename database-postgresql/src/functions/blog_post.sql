CREATE OR REPLACE FUNCTION count_blog_post(
        input_search TEXT
    )
    RETURNS NUMERIC
    AS $$
    DECLARE
        value_count NUMERIC;
    BEGIN
        SELECT COUNT(id) INTO value_count
        FROM blog_post
        WHERE blog_post.title ILIKE '%' || input_search || '%';

        RETURN value_count;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_all_blog_post(
        input_search TEXT,
        input_tags   TEXT,
        input_limit  NUMERIC,
        input_page   NUMERIC
    )
    RETURNS TABLE (
        id         UUID,
        title      TEXT,
        slug       TEXT,
        created_at TIMESTAMP WITH TIME ZONE,
        updated_at TIMESTAMP WITH TIME ZONE,
        is_draft   BOOLEAN
    )
    AS $$
    DECLARE
        value_count NUMERIC;
        max_page    NUMERIC;
    BEGIN
        -- Get count
        SELECT count_blog_post(input_search) INTO value_count;

        -- Set default limit range
        IF input_limit < 10 THEN
            input_limit := 10;
        ELSIF input_limit > 50 THEN
            input_limit := 50;
        END IF;

        -- Set max_page
        max_page :=
            CASE WHEN CEIL(value_count::NUMERIC / input_limit) > 0
                THEN CEIL(value_count::NUMERIC / input_limit) - 1
                ELSE 0
            END;

        -- Set default page range
        IF input_page < 1 THEN
            input_page := 0;
        ELSIF input_page > max_page THEN
            input_page := max_page;
        END IF;

        IF input_tags IS NULL OR input_tags = '' THEN
            RETURN QUERY
                SELECT
                    blog_post.id,
                    blog_post.title,
                    blog_post.slug,
                    blog_post.created_at,
                    blog_post.updated_at,
                    blog_post.is_draft
                FROM blog_post
                WHERE blog_post.title ILIKE '%' || input_search || '%'
                LIMIT input_limit
                OFFSET input_limit * input_page;
        ELSE
            RETURN QUERY
                WITH tag_array AS (
                    SELECT string_to_array(input_tags, ',') AS tags
                )
                SELECT
                    blog_post.id,
                    blog_post.title,
                    blog_post.slug,
                    blog_post.created_at,
                    blog_post.updated_at,
                    blog_post.is_draft
                FROM blog_post
                INNER JOIN blog_post_tag ON blog_post.id = blog_post_tag.post_id
                INNER JOIN blog_tag ON blog_post_tag.tag_id = blog_tag.id
                WHERE blog_post.title ILIKE '%' || input_search || '%'
                AND blog_tag.name ILIKE ANY (SELECT unnest(tags) FROM tag_array)
                LIMIT input_limit
                OFFSET input_limit * input_page;
        END IF;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION create_blog_post(
        input_title      TEXT,
        input_slug       TEXT,
        input_created_at TIMESTAMP WITH TIME ZONE,
        input_updated_at TIMESTAMP WITH TIME ZONE,
        input_is_draft   BOOLEAN
    )
    RETURNS TABLE (
        id         UUID,
        title      TEXT,
        slug       TEXT,
        created_at TIMESTAMP WITH TIME ZONE,
        updated_at TIMESTAMP WITH TIME ZONE,
        is_draft   BOOLEAN
    )
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        INSERT INTO blog_post (title, slug, created_at, updated_at, is_draft)
        VALUES (input_title, input_slug, input_created_at, input_updated_at, input_is_draft)
        RETURNING blog_post.id INTO return_id;

        RETURN QUERY
            INSERT INTO blog_post (title, slug, created_at, updated_at, is_draft)
            VALUES (input_title, input_slug, input_created_at, input_updated_at, input_is_draft)
            RETURNING
                blog_post.id,
                blog_post.title,
                blog_post.slug,
                blog_post.created_at,
                blog_post.updated_at,
                blog_post.is_draft;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_blog_post(
        input_id         UUID,
        input_title      TEXT,
        input_slug       TEXT,
        input_created_at TIMESTAMP WITH TIME ZONE,
        input_updated_at TIMESTAMP WITH TIME ZONE,
        input_is_draft   BOOLEAN
    )
    RETURNS TABLE (
        id         UUID,
        title      TEXT,
        slug       TEXT,
        created_at TIMESTAMP WITH TIME ZONE,
        updated_at TIMESTAMP WITH TIME ZONE,
        is_draft   BOOLEAN
    )
    AS $$
    BEGIN
        RETURN QUERY
            UPDATE blog_post
            SET title = input_title,
                slug = input_slug,
                created_at = input_created_at,
                updated_at = input_updated_at,
                is_draft = input_is_draft
            WHERE blog_post.id = input_id
            RETURNING
                blog_post.id,
                blog_post.title,
                blog_post.slug,
                blog_post.created_at,
                blog_post.updated_at,
                blog_post.is_draft;
    END;
    $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION remove_blog_post(
        input_id UUID
    )
    RETURNS TABLE (
        id         UUID,
        title      TEXT,
        slug       TEXT,
        created_at TIMESTAMP WITH TIME ZONE,
        updated_at TIMESTAMP WITH TIME ZONE,
        is_draft   BOOLEAN
    )
    AS $$
    DECLARE
        return_id UUID;
    BEGIN
        RETURN QUERY
            DELETE FROM blog_post
            WHERE blog_post.id = input_id
            RETURNING
                blog_post.id,
                blog_post.title,
                blog_post.slug,
                blog_post.created_at,
                blog_post.updated_at,
                blog_post.is_draft;
    END;
    $$ LANGUAGE plpgsql;
