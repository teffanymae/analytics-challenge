import { Card } from "@/components/ui/card";
import { TrendingUp, Users } from "lucide-react";

interface MetricsSummaryCardsProps {
  totalEngagement: number;
  totalReach: number;
}

export function MetricsSummaryCards({
  totalEngagement,
  totalReach,
}: MetricsSummaryCardsProps) {
  return (
    <div className="flex flex-col lg:flex-row gap-4">
      <Card className="w-full p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Engagement</p>
              <p className="text-2xl font-bold">
                {totalEngagement.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="w-full p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Reach</p>
              <p className="text-2xl font-bold">
                {totalReach.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
