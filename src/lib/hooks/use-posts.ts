import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/lib/database/database.types";
import { getUserFriendlyError } from "@/lib/utils/errors";

type Post = Tables<"posts">;

interface PostsResponse {
  posts: Post[];
  total: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

export function usePosts(
  platform?: string,
  page = 1,
  pageSize = 10
) {
  return useQuery<PostsResponse>({
    queryKey: ["posts", platform, page, pageSize],
    queryFn: async () => {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          platform,
          page,
          pageSize,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || getUserFriendlyError(response));
      }

      const result = await response.json();

      return {
        posts: result.data,
        total: result.pagination.total,
        totalPages: result.pagination.totalPages,
        currentPage: result.pagination.page,
        pageSize: result.pagination.pageSize,
      };
    },
  });
}

export function usePost(postId: string) {
  return useQuery<Post>({
    queryKey: ["post", postId],
    queryFn: async () => {
      const response = await fetch(`/api/posts/${postId}`, {
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || getUserFriendlyError(response));
      }

      return response.json();
    },
    enabled: !!postId,
  });
}
