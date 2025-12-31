import { NextRequest } from "next/server";
import { authenticateUser } from "@/lib/auth/auth";
import { fetchEngagementData } from "@/lib/services/engagement.service";
import { handleError, successResponse } from "@/lib/utils/response";

interface TrendsRequestBody {
  days?: number;
  platform?: string;
}

export async function POST(request: NextRequest) {
  try {
    const { user, supabase } = await authenticateUser();
    const body: TrendsRequestBody = await request.json();

    const result = await fetchEngagementData(supabase, {
      ...body,
      userId: user.id,
    });

    return successResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
