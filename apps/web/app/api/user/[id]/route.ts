import { withCheckRoute } from "@/utils/request";
import { api } from "@/utils/api";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export const PATCH = withCheckRoute(
  async (request: Request, { params }: RouteParams) => {
    try {
      const { id } = await params;
      const body = await request.json();

      const response = await api.patch(`/user/${id}`, body);

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
  },
);

export const DELETE = withCheckRoute(
  async (_request: Request, { params }: RouteParams) => {
    try {
      const { id } = await params;

      const response = await api.delete(`/user/${id}`);

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
  },
);
