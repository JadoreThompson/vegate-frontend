import type { HTTPValidationError } from "@/openapi";

export function handleApi<T>(
  response:
    | { status: 200 | 201 | 202 | 204; data: T; headers: Headers }
    | { status: number; data: HTTPValidationError; headers: Headers },
): T {

  if (
    response.status === 200 ||
    response.status === 201 ||
    response.status === 202 ||
    response.status === 204
  ) {
    return response.data as T;
  }
  
  throw response.data;
}
