import { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { fetchDailyMetrics } from "@/lib/services/metrics.service";
import { handleError, successResponse } from "@/lib/utils/response";
import { AuthenticationError } from "@/lib/utils/errors";
import type { Database } from "@/lib/database/database.types";

export const runtime = 'edge';

function getSupabaseAuthCookie(request: NextRequest): string | null {
  const allCookies = request.cookies.getAll();
  const authCookie = allCookies.find(cookie => 
    cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token')
  );
  return authCookie?.value || null;
}

function extractAccessToken(cookieValue: string): string {
  try {
    const value = cookieValue.startsWith('base64-') 
      ? cookieValue.substring(7) 
      : cookieValue;
    
    const tokenData = JSON.parse(atob(value));
    return tokenData.access_token;
  } catch {
    throw new AuthenticationError();
  }
}

function createEdgeSupabaseClient(accessToken: string) {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: `Bearer ${accessToken}` } },
    }
  );
}

export async function GET(request: NextRequest) {
  try {
    const authCookie = getSupabaseAuthCookie(request);
    
    if (!authCookie) {
      throw new AuthenticationError();
    }

    const accessToken = extractAccessToken(authCookie);
    const supabase = createEdgeSupabaseClient(accessToken);

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      throw new AuthenticationError();
    }

    const days = parseInt(request.nextUrl.searchParams.get("days") || "30", 10);
    const result = await fetchDailyMetrics(supabase, {
      days,
      userId: user.id,
    });

    return successResponse(result);
  } catch (error) {
    return handleError(error);
  }
}
