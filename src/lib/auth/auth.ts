import { createClient } from "@/lib/supabase/server";
import { AuthenticationError } from "@/lib/utils/errors";
import type { SupabaseClient, User } from "@supabase/supabase-js";

export interface AuthResult {
  user: User;
  supabase: SupabaseClient;
}

export async function authenticateUser(): Promise<AuthResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new AuthenticationError();
  }

  return { user, supabase };
}
