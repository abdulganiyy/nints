import { withCheckRoute } from "@/utils/request";
import { api } from "@/utils/api";

export const GET = withCheckRoute(async (request: Request) => {
  try {
    const response = await api.get("/admin/accounting/account");

    return Response.json(response.data);
  } catch (error: any) {
    return Response.json(
      { message: error?.response?.data?.message },
      { status: error?.response?.data?.statusCode },
    );
  }
});


export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const response = await api.post("/admin/accounting/account", body);

    const data = response.data;

    return Response.json(data);
  } catch (error: any) {
    console.log(error?.response);
    return Response.json(
      { message: error?.response?.data?.message },
      { status: error?.response?.data?.statusCode },
    );
  }
};