import { Type } from "class-transformer";
import { UserVM } from "../user/user-vm";

export class SessionVM {
  token: string;
  // @Type(() => UserVM)
  user: UserVM;

  constructor() {
    this.token = "";
    this.user = new UserVM();
  }
}
