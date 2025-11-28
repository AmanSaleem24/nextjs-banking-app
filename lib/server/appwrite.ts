// src/lib/server/appwrite.js
"use server";
import { Client, Account, Databases, Users, TablesDB } from "node-appwrite";
import { cookies } from "next/headers";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);
  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
    tables: new TablesDB(client)
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.NEXT_APPWRITE_SECRET!);
  
  return {
    account: new Account(client),
    tables: new TablesDB(client), // Changed from "databases" to "tables"
    user: new Users(client),
  };
}
