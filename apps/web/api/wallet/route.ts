import { withCheckRoute } from "@/utils/request";
import { api } from "@/utils/api";

export const GET = withCheckRoute(async (request: Request) => {
  try {
    const response = await api.get("/wallet");

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error?.response?.data?.message },
      { status: error?.response?.data?.statusCode },
    );
  }
});
