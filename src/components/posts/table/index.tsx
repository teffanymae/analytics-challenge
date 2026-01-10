"use client";

import { useState, useMemo, useEffect } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";
import { usePosts } from "@/lib/hooks/use-posts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUIStore } from "@/lib/stores/ui-store";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { postsTableColumns } from "./columns";
import { TableLoading } from "./table-loading";
import { TableEmptyState } from "./empty-state";
import { TablePagination } from "./pagination";
import { PostDetailModal } from "../modal";
import { MobilePostCard } from "./mobile-card";

export function PostsTable() {
  const platformFilter = useUIStore((state) => state.platformFilter);
  const setPlatformFilter = useUIStore((state) => state.setPlatformFilter);
  const selectedPostId = useUIStore((state) => state.selectedPostId);
  const isPostModalOpen = useUIStore((state) => state.isPostModalOpen);
  const openPostModal = useUIStore((state) => state.openPostModal);
  const closePostModal = useUIStore((state) => state.closePostModal);
  const pageSize = useUIStore((state) => state.pageSize);
  const setPageSize = useUIStore((state) => state.setPageSize);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when platform filter or page size changes
  useEffect(() => {
    setCurrentPage(1);
  }, [platformFilter, pageSize]);

  const { data, isLoading, error } = usePosts(
    platformFilter,
    currentPage,
    pageSize
  );
  const posts = data?.posts || [];
  const totalPages = data?.totalPages || 1;
  const total = data?.total || 0;

  const columns = useMemo(() => postsTableColumns, []);

  const table = useReactTable({
    data: posts,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <p className="text-red-600 font-medium">Error loading posts</p>
        <p className="text-sm text-red-500 mt-2">Please try again later</p>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Post</h2>
            <p className="text-sm text-gray-500 mt-1">
              Access your published posts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">
              Platform:
            </label>
            <Select
              value={platformFilter || "all"}
              onValueChange={(value) =>
                setPlatformFilter(value === "all" ? undefined : value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
          {isLoading ? (
            <TableLoading />
          ) : posts.length === 0 ? (
            <TableEmptyState platformFilter={platformFilter} />
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="md:hidden">
                {posts.map((post) => (
                  <MobilePostCard
                    key={post.id}
                    post={post}
                    onClick={() => openPostModal(post.id)}
                  />
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block">
                <Table>
                  <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow
                        key={headerGroup.id}
                        className="border-b border-gray-200 bg-gray-50/50"
                      >
                        {headerGroup.headers.map((header) => (
                          <TableHead
                            key={header.id}
                            className="text-sm font-medium text-gray-600 h-12 text-center"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        ))}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody>
                    {table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        className="cursor-pointer hover:bg-gray-50 transition-all border-b border-gray-100 last:border-0"
                        onClick={() => openPostModal(row.original.id)}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id} className="py-4 text-center">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>

        {selectedPostId && (
          <PostDetailModal
            postId={selectedPostId}
            open={isPostModalOpen}
            onOpenChange={(open) => !open && closePostModal()}
          />
        )}

        {!isLoading && posts.length > 0 && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            total={total}
            isLoading={isLoading}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        )}
      </div>
    </Card>
  );
}
