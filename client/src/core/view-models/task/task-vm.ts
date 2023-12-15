export class TaskItemVM {
  createdAt: string;
  description: string;
  dueDate: string;
  id: string;
  status: string;
  title: string;

  constructor() {
    this.createdAt = "";
    this.description = "";
    this.dueDate = "";
    this.id = "";
    this.status = "";
    this.title = "";
  }
}
