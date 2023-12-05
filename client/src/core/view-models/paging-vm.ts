export class PagingVM {
  currentPage: number;
  perPage: number;
  count: number;
  totalItems: number;
  totalPages: number;

  constructor() {
    this.currentPage = 1;
    this.perPage = 10;
    this.count = 0;
    this.totalItems = 0;
    this.totalPages = 0;
  }
}

export type PagingConfigVM = PagingVM & {
  onPageChange: (page: string | number, perPage: string | number) => void;
};
