import { type NextRequest, NextResponse } from "next/server";
import { mapleApiClient } from "@/lib/http-client";

// ============================================================================
// 타입 정의
// ============================================================================

type RouteParams = {
  params: {
    path: string[];
  };
};

type ApiResponse<T = any> = {
  data: T;
  status: number;
};

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

// ============================================================================
// 순수 함수들
// ============================================================================

/**
 * 경로 세그먼트를 API 경로로 변환하는 순수 함수
 */
const buildApiPath = (pathSegments: string[]): string =>
  `/${pathSegments.join("/")}`;

/**
 * URL에서 쿼리 파라미터를 추출하는 순수 함수
 */
const extractQueryParams = (
  url: string,
): Record<string, string> | undefined => {
  const { searchParams } = new URL(url);
  const query: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    query[key] = value;
  });

  return Object.keys(query).length > 0 ? query : undefined;
};

/**
 * JSON 파싱을 안전하게 처리하는 순수 함수
 */
const safeJsonParse = async (
  request: NextRequest,
): Promise<Record<string, any>> => {
  try {
    return await request.json();
  } catch {
    return {};
  }
};

/**
 * 에러 응답을 생성하는 순수 함수
 */
const createErrorResponse = (
  error: unknown,
  method: HttpMethod,
): NextResponse => {
  console.error(`${method} 요청 실패:`, error);
  return NextResponse.json(
    { error: "API 요청 처리 중 오류가 발생했습니다." },
    { status: 500 },
  );
};

/**
 * 성공 응답을 생성하는 순수 함수
 */
const createSuccessResponse = (data: any, status: number): NextResponse =>
  NextResponse.json(data, {
    headers: {
      "Content-Type": "application/json",
    },
    status,
  });

/**
 * 헤더 팩토리 함수를 생성하는 고차 함수
 */
const createHeadersFactory = (request: NextRequest) => () => request.headers;

// ============================================================================
// API 클라이언트 호출 함수들
// ============================================================================

/**
 * GET 요청을 처리하는 순수 함수
 */
const executeGetRequest = async (
  path: string,
  query: Record<string, string> | undefined,
  headersFactory: () => Headers,
): Promise<ApiResponse> => {
  const client = mapleApiClient();
  const response = await client.get(path, { query }, headersFactory);
  return { data: response.data, status: response.status };
};

/**
 * 바디가 있는 요청을 처리하는 순수 함수
 */
const executeRequestWithBody = async (
  method: "POST" | "PUT" | "PATCH",
  path: string,
  data: Record<string, any>,
  query: Record<string, string> | undefined,
  headersFactory: () => Headers,
): Promise<ApiResponse> => {
  const client = mapleApiClient();
  const methodMap = {
    PATCH: client.patch,
    POST: client.post,
    PUT: client.put,
  };

  const response = await methodMap[method](
    path,
    { data, query },
    headersFactory,
  );
  return { data: response.data, status: response.status };
};

/**
 * DELETE 요청을 처리하는 순수 함수
 */
const executeDeleteRequest = async (
  path: string,
  query: Record<string, string> | undefined,
  headersFactory: () => Headers,
): Promise<ApiResponse> => {
  const client = mapleApiClient();
  const response = await client.delete(path, { query }, headersFactory);
  return { data: response.data, status: response.status };
};

// ============================================================================
// 고차 함수 - API 핸들러 팩토리
// ============================================================================

/**
 * API 핸들러를 생성하는 고차 함수
 */
const createApiHandler =
  (
    method: HttpMethod,
    executor: (
      path: string,
      request: NextRequest,
      headersFactory: () => Headers,
      ...args: any[]
    ) => Promise<ApiResponse>,
  ) =>
  async (
    request: NextRequest,
    { params }: RouteParams,
  ): Promise<NextResponse> => {
    try {
      const path = buildApiPath(params.path);
      const headersFactory = createHeadersFactory(request);

      const result = await executor(path, request, headersFactory);
      return createSuccessResponse(result.data, result.status);
    } catch (error) {
      return createErrorResponse(error, method);
    }
  };

// ============================================================================
// 특화된 실행기 함수들
// ============================================================================

const executeGet = async (
  path: string,
  request: NextRequest,
  headersFactory: () => Headers,
): Promise<ApiResponse> => {
  console.log("adfsadfdasfladsklfjadsf");
  const query = extractQueryParams(request.url);
  return executeGetRequest(path, query, headersFactory);
};

const executePost = async (
  path: string,
  request: NextRequest,
  headersFactory: () => Headers,
): Promise<ApiResponse> => {
  const query = extractQueryParams(request.url);
  const data = await safeJsonParse(request);
  return executeRequestWithBody("POST", path, data, query, headersFactory);
};

const executePut = async (
  path: string,
  request: NextRequest,
  headersFactory: () => Headers,
): Promise<ApiResponse> => {
  const query = extractQueryParams(request.url);
  const data = await safeJsonParse(request);
  return executeRequestWithBody("PUT", path, data, query, headersFactory);
};

const executePatch = async (
  path: string,
  request: NextRequest,
  headersFactory: () => Headers,
): Promise<ApiResponse> => {
  const query = extractQueryParams(request.url);
  const data = await safeJsonParse(request);
  return executeRequestWithBody("PATCH", path, data, query, headersFactory);
};

const executeDelete = async (
  path: string,
  request: NextRequest,
  headersFactory: () => Headers,
): Promise<ApiResponse> => {
  const query = extractQueryParams(request.url);
  return executeDeleteRequest(path, query, headersFactory);
};

// ============================================================================
// 내보낸 핸들러들 (함수 합성을 통해 생성)
// ============================================================================

export const GET = createApiHandler("GET", executeGet);
export const POST = createApiHandler("POST", executePost);
export const PUT = createApiHandler("PUT", executePut);
export const PATCH = createApiHandler("PATCH", executePatch);
export const DELETE = createApiHandler("DELETE", executeDelete);
