import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { mapleApiClient } from "@/services/maple/client";

export type Params = { path: string[] };

export async function prepareRequest(
  req: NextRequest,
  segmentData: { params: Promise<Params> },
) {
  const params = await segmentData.params;
  const pathSegment = params?.path ? Object.values(params.path).join("/") : "";
  const { searchParams } = new URL(req.url);
  const method = req.method.toLowerCase();

  let requestData: unknown;
  if (method !== "get" && method !== "head") {
    const contentType = req.headers.get("content-type");
    if (contentType?.includes("application/json")) {
      try {
        const text = await req.text();
        requestData = text ? JSON.parse(text) : undefined;
      } catch (e) {
        console.log("[API Proxy] 요청 바디 파싱 오류:", e);
      }
    }
  }
  const queryParams: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    queryParams[key] = value;
  });
  return {
    pathSegment,
    queryParams,
    requestData,
  };
}

export async function GET(
  req: NextRequest,
  segmentData: { params: Promise<Params> },
) {
  const headers = new Headers(req.headers);
  const { pathSegment, queryParams } = await prepareRequest(req, segmentData);
  const response = await mapleApiClient().get(
    `/${pathSegment}`,
    { query: queryParams },
    () => headers,
  );
  return NextResponse.json(response.data, { status: response.status });
}

export const POST = async (
  req: NextRequest,
  segmentData: { params: Promise<Params> },
) => {
  const headers = new Headers(req.headers);
  const { pathSegment, queryParams } = await prepareRequest(req, segmentData);
  const response = await mapleApiClient().post(
    `/${pathSegment}`,
    { query: queryParams },
    () => headers,
  );
  return NextResponse.json(response.data, { status: response.status });
};

export const PUT = async (
  req: NextRequest,
  segmentData: { params: Promise<Params> },
) => {
  const headers = new Headers(req.headers);
  const { pathSegment, queryParams } = await prepareRequest(req, segmentData);
  const response = await mapleApiClient().put(
    `/${pathSegment}`,
    { query: queryParams },
    () => headers,
  );
  return NextResponse.json(response.data, { status: response.status });
};

export const DELETE = async (
  req: NextRequest,
  segmentData: { params: Promise<Params> },
) => {
  const headers = new Headers(req.headers);
  const { pathSegment, queryParams } = await prepareRequest(req, segmentData);
  const response = await mapleApiClient().delete(
    `/${pathSegment}`,
    { query: queryParams },
    () => headers,
  );
  return NextResponse.json(response.data, { status: response.status });
};

export const PATCH = async (
  req: NextRequest,
  segmentData: { params: Promise<Params> },
) => {
  const headers = new Headers(req.headers);
  const { pathSegment, queryParams } = await prepareRequest(req, segmentData);
  const response = await mapleApiClient().patch(
    `/${pathSegment}`,
    { query: queryParams },
    () => headers,
  );
  return NextResponse.json(response.data, { status: response.status });
};
