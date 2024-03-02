export class FindAllResultEntity<T> {
  pageSize: number;
  page: number;
  totalPage: number;
  total: number;
  data: T[];
}
