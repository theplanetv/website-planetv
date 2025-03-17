// @generated automatically by Diesel CLI.

diesel::table! {
    blog_post (id) {
        id -> Uuid,
        title -> Text,
        slug -> Text,
        content -> Text,
        created_at -> Nullable<Timestamptz>,
        updated_at -> Nullable<Timestamptz>,
        is_draft -> Nullable<Bool>,
    }
}

diesel::table! {
    blog_post_tag (id) {
        id -> Uuid,
        tag_id -> Nullable<Uuid>,
        post_id -> Nullable<Uuid>,
    }
}

diesel::table! {
    blog_tag (id) {
        id -> Uuid,
        color -> Text,
        name -> Text,
    }
}

diesel::joinable!(blog_post_tag -> blog_post (post_id));
diesel::joinable!(blog_post_tag -> blog_tag (tag_id));

diesel::allow_tables_to_appear_in_same_query!(
    blog_post,
    blog_post_tag,
    blog_tag,
);
