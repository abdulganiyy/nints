import { Session, User, LoginFormValues } from "@/types";
import { api } from "@/utils/api";
import { createSession } from "@/utils/session";

export const POST = async (request: Request) => {
  try {
    const body = (await request.json()) as LoginFormValues;

    const response = await api.post("/auth/login", body);

    const data = response.data as Session;

    const {
      accessToken,
      user: { permissions, ...rest },
    } = data;

    await createSession({ accessToken, user: rest });

    return Response.json(data.user);
  } catch (error: any) {
    console.log(error?.response);
    return Response.json(
      { message: error?.response?.data?.message },
      { status: error?.response?.data?.statusCode },
    );
  }
};
