import { withCheckRoute } from "@/utils/request";
import { api } from "@/utils/api";

export const POST = withCheckRoute(async (request: Request) => {
  try {
    const body = await request.json();

    const response = await api.post("/vtu/airtime", body);

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error?.response?.data?.message },
      { status: error?.response?.data?.statusCode },
    );
  }
});
