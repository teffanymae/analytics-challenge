import { NextRequest } from "next/server";
import { authenticateUser } from "@/lib/auth/auth";
import { fetchAnalyticsSummary } from "@/lib/services/summary.service";
import { handleError, successResponse } from "@/lib/utils/response";

export async function GET(request: NextRequest) {
  try {
    const { user, supabase } = await authenticateUser();
    const days = parseInt(request.nextUrl.searchParams.get("days") || "30", 10);

    const result = await fetchAnalyticsSummary(supabase, {
      days,
      userId: user.id,
    });

    return successResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
