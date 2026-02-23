"use server";

import {
  createPost,
  updatePost,
  deletePost,
  togglePublish,
  type CreatePostInput,
} from "@/lib/supabase/admin-queries";

export async function createPostAction(input: CreatePostInput) {
  return createPost(input);
}

export async function updatePostAction(
  id: string,
  input: Partial<CreatePostInput>
) {
  return updatePost(id, input);
}

export async function deletePostAction(id: string) {
  return deletePost(id);
}

export async function togglePublishAction(id: string, published: boolean) {
  return togglePublish(id, published);
}
