import { createClient, SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/supabase/edge";
import { AuthenticationError, AppError } from "@/lib/utils/errors";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export interface AuthResult {
  user: User;
  supabase: SupabaseClient;
}

export async function authenticateUserEdge(authHeader: string | null): Promise<AuthResult> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new AppError("Service configuration error. Please contact support.", 500);
  }

  if (!authHeader?.startsWith("Bearer ")) {
    throw new AuthenticationError();
  }

  const supabase = createClient(authHeader);

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new AuthenticationError();
  }

  return { user, supabase };
}
