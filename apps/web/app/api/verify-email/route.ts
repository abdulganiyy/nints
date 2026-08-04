import { api } from "@/utils/api";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const response = await api.post("/auth/verify-email", body);

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
