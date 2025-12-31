import { ColumnDef } from "@tanstack/react-table";
import { Tables } from "@/lib/database/database.types";
import Image from "next/image";
import { formatShortDate } from "@/lib/utils/date";
import { SortableHeader } from "./sortable-header";

export const postsTableColumns: ColumnDef<Tables<"posts">>[] = [
  {
    accessorKey: "thumbnail_url",
    header: "Thumbnail",
    cell: ({ row }) => {
      const url = row.getValue("thumbnail_url") as string | null;
      return (
        <div className="flex justify-center">
          {url ? (
            <Image
              src={url}
              alt="Post thumbnail"
              className="object-cover rounded"
              width={64}
              height={64}
            />
          ) : (
            <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
              No image
            </div>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "caption",
    header: "Caption",
    cell: ({ row }) => {
      const caption = row.getValue("caption") as string | null;
      return caption ? (
        <div className="max-w-xs truncate text-center" title={caption}>
          {caption}
        </div>
      ) : (
        <span className="text-gray-400 text-sm">No caption</span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "platform",
    header: "Platform",
    cell: ({ row }) => {
      const platform = row.getValue("platform") as string;
      return (
        <div className="flex justify-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
            {platform}
          </span>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "likes",
    header: ({ column }) => (
      <SortableHeader column={column}>Likes</SortableHeader>
    ),
    cell: ({ row }) => {
      const likes = row.getValue("likes") as number | null;
      return (
        <div className="font-medium">
          {likes?.toLocaleString() || 0}
        </div>
      );
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => (
      <SortableHeader column={column}>Comments</SortableHeader>
    ),
    cell: ({ row }) => {
      const comments = row.getValue("comments") as number | null;
      return (
        <div className="font-medium">
          {comments?.toLocaleString() || 0}
        </div>
      );
    },
  },
  {
    accessorKey: "shares",
    header: ({ column }) => (
      <SortableHeader column={column}>Shares</SortableHeader>
    ),
    cell: ({ row }) => {
      const shares = row.getValue("shares") as number | null;
      return (
        <div className="font-medium">
          {shares?.toLocaleString() || 0}
        </div>
      );
    },
  },
  {
    accessorKey: "engagement_rate",
    header: ({ column }) => (
      <SortableHeader column={column}>Engagement Rate</SortableHeader>
    ),
    cell: ({ row }) => {
      const rate = row.getValue("engagement_rate") as number | null;
      return (
        <div className="font-medium">{rate?.toFixed(2)}%</div>
      );
    },
  },
  {
    accessorKey: "posted_at",
    header: ({ column }) => (
      <SortableHeader column={column}>Posted Date</SortableHeader>
    ),
    cell: ({ row }) => {
      const date = row.getValue("posted_at") as string;
      return <div className="text-sm text-center">{formatShortDate(date)}</div>;
    },
  },
];
