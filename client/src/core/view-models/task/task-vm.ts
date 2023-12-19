export class TaskItemVM {
  createdAt: string;
  description: string;
  dueDate: string;
  id: number;
  status: string;
  title: string;

  constructor() {
    this.createdAt = "";
    this.description = "";
    this.dueDate = "";
    this.id = -1;
    this.status = "";
    this.title = "";
  }
}
