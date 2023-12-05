export class RoutePageVM {
  path: string;
  name: string;
  component: any;
  icon?: any;
  exact?: boolean;
  roles: string[];
  pages?: RoutePageVM[];
  id: string;
  order: number;

  constructor() {
    this.path = "";
    this.name = "";
    this.component = null;
    this.icon = null;
    this.roles = [];
    this.id = "";
    this.order = 0;
  }
}

export class RouteVM {
  layout: string;
  pages: RoutePageVM[];
  icon: any;
  title: string;
  basePath?: string;

  constructor() {
    this.layout = "";
    this.pages = [];
    this.title = "";
  }
}
