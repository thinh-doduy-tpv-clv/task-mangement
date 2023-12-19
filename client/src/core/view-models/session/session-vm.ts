// import { Type } from "class-transformer";
// import { UserVM } from "../user/user-vm";

export class SessionVM {
  token: string;
  // @Type(() => UserVM)

  constructor() {
    this.token = "";
  }
}
