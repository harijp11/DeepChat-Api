export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "supersecretaccess";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "supersecretrefresh";

export const SuccessMessages = {
  USER_REGISTERED: "User registered successfully",
  LOGIN_SUCCESS: "User logged in successfully",
  LOGOUT_SUCCESS: "User logged out successfully",
  PASSWORD_CHANGED: "Password changed successfully",
  TOKEN_REFRESHED: "Token refreshed successfully",
  PROFILE_UPDATED: "Profile updated successfully",
  EMAIL_VERIFIED: "Email verified successfully",
  PASSWORD_RESET_SENT: "Password reset link sent successfully",
  PASSWORD_RESET_SUCCESS: "Password reset successfully",
};

export const ErrorMessages = {
  USER_NOT_FOUND: "User not found",
  INVALID_CREDENTIALS: "Invalid credentials",
  EMAIL_OR_PASSWORD_MISSING: "Email or password is missing",
  SERVER_ERROR: "Internal server error",
  UNAUTHORIZED: "Unauthorized access",
  FORBIDDEN: "Forbidden",
  TOKEN_EXPIRED: "Token has expired",
  REFRESH_TOKEN_INVALID: "Invalid refresh token",
  INVALID_INPUT: "Invalid input",
  EMAIL_ALREADY_EXISTS: "Email already exists",
  PHONE_ALREADY_EXISTS: "Phone number already exists",
  PASSWORD_MISMATCH: "Passwords do not match",
  PASSWORD_TOO_WEAK: "Password does not meet security requirements",
  INCORRECT_PASSWORD:"Old password is incorrect",
  RESOURCE_NOT_FOUND: "Requested resource not found",
  ACTION_NOT_ALLOWED: "Action not allowed",
  TOKEN_MISSING: "Authorization token missing",
  INVALID_TOKEN:"Token expired",
  ROUTE_NOT_FOUND:"The requested route does not exist", 
};
