import type { SupabaseClient } from "@supabase/supabase-js";
import { NotFoundError } from "@/lib/utils/errors";
import { sanitizePageParams } from "@/lib/utils/validation";
import type { Tables } from "@/lib/database/database.types";

export interface PostsQueryParams {
  platform?: string;
  page?: number;
  pageSize?: number;
  userId: string;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MAX_PAGE_SIZE = 100;

export async function fetchPosts(
  supabase: SupabaseClient,
  params: PostsQueryParams
) {
  const {
    platform,
    page = DEFAULT_PAGE,
    pageSize = DEFAULT_PAGE_SIZE,
    userId,
  } = params;

  const { page: validatedPage, pageSize: validatedPageSize } =
    sanitizePageParams(page, pageSize, MAX_PAGE_SIZE);

  const from = (validatedPage - 1) * validatedPageSize;
  const to = from + validatedPageSize - 1;

  let query = supabase
    .from("posts")
    .select("*", { count: "exact" })
    .eq("user_id", userId)
    .order("posted_at", { ascending: false })
    .range(from, to);

  if (platform) {
    query = query.eq("platform", platform.toLowerCase());
  }

  const { data, error, count } = await query;

  if (error) {
    throw new Error("Unable to retrieve posts. Please try again.");
  }

  const total = count || 0;
  const pagination: PaginationMeta = {
    page: validatedPage,
    pageSize: validatedPageSize,
    total,
    totalPages: Math.ceil(total / validatedPageSize),
  };

  return {
    data: (data || []) as Tables<"posts">[],
    pagination,
  };
}

export async function fetchPostById(
  supabase: SupabaseClient,
  postId: string,
  userId: string
) {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", postId)
    .eq("user_id", userId)
    .single();

  if (error) {
    throw new NotFoundError("Post not found or you don't have access to it");
  }

  return data as Tables<"posts">;
}
