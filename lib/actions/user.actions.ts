"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server/appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    const cookieStore = await cookies();

    cookieStore.set("appwrite-session", session.secret, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return parseStringify(session);
  } catch (error) {
    console.log(error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  try {
    const { email, password, firstName, lastName } = userData;
    const name = `${firstName} ${lastName}`;
    const { account } = await createAdminClient();

    const newUserAccount = await account.create({
      userId: ID.unique(),
      email,
      password,
      name,
    });
    const session = await account.createEmailPasswordSession({
      email,
      password,
    });

    const cookieStore = await cookies();
    cookieStore.set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
  } catch (error: any) {
    console.log(error.message);
  }
};

export async function logoutUser() {
  try {
    const { account } = await createSessionClient();
    const cookieStore = await cookies();
    cookieStore.delete("appwrite-session");
    const logOut = await account.deleteSession({ sessionId: "current" });
    return logOut;
  } catch (error) {
    console.log(error);
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const loggedInUser = await account.get();
    console.log(loggedInUser);
    return loggedInUser;
  } catch (error) {
    return null;
  }
}
