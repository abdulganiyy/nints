"use server";

import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";

import { Session } from "@/types";
import { SESSION_COOKIE_NAME } from "./constants";

import { redirect } from "next/navigation";

/**
 * This is how long the access token is valid in minute.
 */
const TOKEN_EXPIRY = 24 * 60;

const getSessionSecret = () =>
  new TextEncoder().encode(process.env.SESSION_SECRET_KEY);

const encryptSession = async (payload: Session) => {
  return await new SignJWT(payload)
    .setIssuedAt()
    .setProtectedHeader({ alg: "HS256" })
    .sign(getSessionSecret());
};

export const createSession = async (sessionInfo: Session) => {
  const session = await encryptSession(sessionInfo);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: (TOKEN_EXPIRY - 1) * 60,
    secure: process.env.NODE_ENV !== "development",
  });
};

export const updateSession = async (sessionInfo: Session) => {
  const session = await encryptSession(sessionInfo);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: (TOKEN_EXPIRY - 1) * 60,
    secure: process.env.NODE_ENV !== "development",
  });
};

export const deleteSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete(SESSION_COOKIE_NAME);

  redirect("/signin");
};

export const getSession = async (sessionCookie?: string) => {
  if (!sessionCookie) {
    return null;
  }

  try {
    const { payload } = await jwtVerify<Session>(
      sessionCookie,
      getSessionSecret(),
    );

    return payload;
  } catch (e) {
    return null;
  }
};

export const getSessionForPage = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  return (await getSession(sessionCookie?.value)) as Session | null;
};

export const getToken = async () => {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);

  const session = (await getSession(sessionCookie?.value)) as Session | null;

  return session?.accessToken || "";
};
