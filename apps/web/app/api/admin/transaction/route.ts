import { withCheckRoute } from "@/utils/request";
import { api } from "@/utils/api";

export const GET = withCheckRoute(async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);

    const response = await api.get("/transaction/admin", {
      params: Object.fromEntries(searchParams.entries()),
    });

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error?.response?.data?.message },
      { status: error?.response?.status ?? 500 },
    );
  }
});