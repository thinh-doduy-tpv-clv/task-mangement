import { SessionData } from "./task-management/lib";
import { defaultSession, sessionOptions, sleep } from "./task-management/lib";
import { getIronSession, IronSession } from "iron-session";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function getSession(shouldSleep = true) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);

  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
    session.username = defaultSession.username;
  }

  if (shouldSleep) {
    // simulate looking up the user in db
    await sleep(10);
  }

  return session;
}

export async function logout() {
  "use server";

  // false => no db call for logout
  const session = await getSession(false);
  session.destroy();
  revalidatePath("/sign-in");
}

export async function login(
  username: string,
  password: string,
  token?: string
) {
  "use server";

  const session = await getSession();

  session.username = username;
  session.password = password;
  session.token = token || '';
  session.isLoggedIn = true;
  await session.save();
  revalidatePath("/task-management");
}
