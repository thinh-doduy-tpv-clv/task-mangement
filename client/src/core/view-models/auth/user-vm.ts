export class UserVM {
  userId: string;
  username: string;
  password: string;
  email: string;
  link: string;

  constructor() {
    this.userId = "";
    this.username = "";
    this.password = "";
    this.email = "";
    this.link = "";
  }
}