export function ChartLegend() {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div className="flex items-center gap-2">
        <div
          className="w-4 h-0.5 bg-gray-400 border-dashed"
          style={{ borderTop: "2px dashed #9ca3af", background: "none" }}
        ></div>
        <span className="text-sm text-gray-600">Previous Period</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-4 h-0.5 bg-blue-600"></div>
        <span className="text-sm text-gray-600">Current Period</span>
      </div>
    </div>
  );
}
