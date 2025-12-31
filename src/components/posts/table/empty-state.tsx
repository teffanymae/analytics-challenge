interface TableEmptyStateProps {
  platformFilter?: string;
}

export function TableEmptyState({ platformFilter }: TableEmptyStateProps) {
  return (
    <div className="p-12 text-center">
      <div className="text-6xl mb-4">📭</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No posts found
      </h3>
      <p className="text-sm text-gray-500">
        {platformFilter
          ? `No ${platformFilter} posts available. Try a different filter.`
          : "No posts available yet. Create your first post to get started."}
      </p>
    </div>
  );
}
