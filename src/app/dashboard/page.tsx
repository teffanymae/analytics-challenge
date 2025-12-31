"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUIStore } from "@/lib/stores/ui-store";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DailyMetricsChart } from "@/components/charts/daily-metrics";
import { SummaryCards } from "@/components/summary";
import { EngagementChart } from "@/components/charts/engagement";
import { PostsTable } from "@/components/posts/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DashboardPage() {
  const supabase = createClient();
  const router = useRouter();
  const days = useUIStore((state) => state.days);
  const setDays = useUIStore((state) => state.setDays);
  const hasHydrated = useUIStore((state) => state._hasHydrated);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  if (!hasHydrated) {
    return null;
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
    setIsLoggingOut(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold py-2">Analytics Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="cursor-pointer"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </div>
      </header>

      <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex justify-end mb-6">
            <Select
              value={days.toString()}
              onValueChange={(value) => setDays(Number(value))}
            >
              <SelectTrigger className="w-fit bg-white shadow-sm border-gray-300 hover:border-gray-400 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Today</SelectItem>
                <SelectItem value="7">Last 7 days vs prior 7 days</SelectItem>
                <SelectItem value="14">
                  Last 14 days vs prior 14 days
                </SelectItem>
                <SelectItem value="30">
                  Last 30 days vs prior 30 days
                </SelectItem>
                <SelectItem value="60">
                  Last 60 days vs prior 60 days
                </SelectItem>
                <SelectItem value="90">
                  Last 90 days vs prior 90 days
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <section>
            <DailyMetricsChart days={days} />
          </section>

          <section>
            <SummaryCards days={days} />
          </section>

          <section>
            <EngagementChart days={days} />
          </section>

          <section>
            <PostsTable />
          </section>
        </div>
      </main>
    </div>
  );
}
