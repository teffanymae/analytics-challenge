import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  platformFilter: string | undefined;
  selectedPostId: string | null;
  isPostModalOpen: boolean;
  pageSize: number;
  days: number;
  dailyMetricsChartType: "line" | "area";
  engagementChartType: "line" | "area";
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  setPlatformFilter: (platform: string | undefined) => void;
  openPostModal: (postId: string) => void;
  closePostModal: () => void;
  setPageSize: (size: number) => void;
  setDays: (days: number) => void;
  setDailyMetricsChartType: (type: "line" | "area") => void;
  setEngagementChartType: (type: "line" | "area") => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      platformFilter: undefined,
      selectedPostId: null,
      isPostModalOpen: false,
      pageSize: 100,
      days: 30,
      dailyMetricsChartType: "area",
      engagementChartType: "line",
      _hasHydrated: false,
      setHasHydrated: (state) => set({ _hasHydrated: state }),
      setPlatformFilter: (platform) => set({ platformFilter: platform }),
      openPostModal: (postId) =>
        set({ selectedPostId: postId, isPostModalOpen: true }),
      closePostModal: () => set({ selectedPostId: null, isPostModalOpen: false }),
      setPageSize: (size) => set({ pageSize: size }),
      setDays: (days) => set({ days }),
      setDailyMetricsChartType: (type) => set({ dailyMetricsChartType: type }),
      setEngagementChartType: (type) => set({ engagementChartType: type }),
    }),
    {
      name: "ui-store",
      partialize: (state) => ({
        platformFilter: state.platformFilter,
        pageSize: state.pageSize,
        days: state.days,
        dailyMetricsChartType: state.dailyMetricsChartType,
        engagementChartType: state.engagementChartType,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
