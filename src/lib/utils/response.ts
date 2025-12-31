import { NextResponse } from "next/server";
import { AppError } from "@/lib/utils/errors";

export function handleError(error: unknown): NextResponse {
  console.error("API error:", error);

  if (error instanceof AppError) {
    return NextResponse.json(
      { error: error.userMessage || error.message },
      { status: error.statusCode }
    );
  }

  return NextResponse.json(
    { error: "An unexpected error occurred. Please try again." },
    { status: 500 }
  );
}

export function successResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status });
}
