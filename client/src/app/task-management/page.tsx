import Image from "next/image";
import TaskManagementContainer from "src/view/task-management/task-management.container";
import { getSession } from "../action";

export default async function Home() {
  const session = await getSession();

  return <TaskManagementContainer token={session.token} userId={session.id} />;
}
