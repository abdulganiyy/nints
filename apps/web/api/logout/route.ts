import { cookies } from "next/headers";

import { SESSION_COOKIE_NAME } from "@/utils/constants";

export const POST = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);

  return Response.json({ message: "User logged out successfully" });
};
