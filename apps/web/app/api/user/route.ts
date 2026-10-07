import { withCheckRoute } from "@/utils/request";
import { api } from "@/utils/api";

export const GET = withCheckRoute(async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);

    const response = await api.get("/user", {
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

export const POST = withCheckRoute(async (request: Request) => {
  try {
    const body = await request.json();

    const response = await api.post("/user", body);

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error?.response?.data?.message },
      { status: error?.response?.status ?? 500 },
    );
  }
});
