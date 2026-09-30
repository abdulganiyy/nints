import { withCheckRoute } from "@/utils/request";
import { api } from "@/utils/api";

export const PATCH = withCheckRoute(async (request: Request) => {
  try {
    const body = await request.json();

    const response = await api.patch(`/auth/profile`, body);

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      {
        message: error?.response?.data?.message ?? "Something went wrong",
      },
      {
        status: error?.response?.status ?? 500,
      },
    );
  }
});
