export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public userMessage?: string
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class AuthenticationError extends AppError {
  constructor(message = "Authentication required") {
    super(message, 401, "Please log in to continue");
    this.name = "AuthenticationError";
  }
}

export class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(`${resource} not found`, 404, `${resource} not found`);
    this.name = "NotFoundError";
  }
}

export function getUserFriendlyError(error: unknown): string {
  if (error instanceof AppError && error.userMessage) {
    return error.userMessage;
  }
  
  if (error instanceof Error) {
    if (error.message.includes("fetch")) {
      return "Unable to connect to the server. Please check your connection.";
    }
    if (error.message.includes("Unauthorized") || error.message.includes("401")) {
      return "Your session has expired. Please log in again.";
    }
    if (error.message.includes("404") || error.message.includes("not found")) {
      return "The requested data could not be found.";
    }
    if (error.message.includes("500")) {
      return "A server error occurred. Please try again later.";
    }
  }
  
  return "An unexpected error occurred. Please try again.";
}
