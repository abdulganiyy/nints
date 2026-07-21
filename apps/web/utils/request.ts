import { NextRequest } from "next/server";

import { getSession } from "@/utils/session";
import { SESSION_COOKIE_NAME } from "./constants";

export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || "https://nexpos.com";
};

export const withCheckRoute = (
  handler: (request: NextRequest, context: any) => Promise<any>,
) => {
  return async (request: NextRequest, context: any) => {
    const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);
    const session = await getSession(sessionCookie!.value);

    if (!session) {
      return Response.json({
        data: null,
        statusCode: 401,
        message: "Unauthorised",
      });
    }

    return await handler(request, context);
  };
};
