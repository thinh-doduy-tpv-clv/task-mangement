import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import {
  SessionData,
  defaultSession,
  sessionOptions,
  sleep,
} from "../task-management/lib";

// login
export async function POST(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  const {
    username = "No username",
    token = "",
    id = "",
  } = (await request.json()) as {
    username: string;
    token: string;
    id: string;
  };

  session.isLoggedIn = true;
  session.username = username;
  session.token = token;
  session.id = id;
  await session.save();

  // simulate looking up the user in db
  await sleep(250);

  return Response.json(session);
}

// read session
export async function GET() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  // simulate looking up the user in db
  await sleep(250);

  if (session.isLoggedIn !== true) {
    return Response.json(defaultSession);
  }

  return Response.json(session);
}

// logout
export async function DELETE() {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  session.destroy();

  return Response.json(defaultSession);
}
