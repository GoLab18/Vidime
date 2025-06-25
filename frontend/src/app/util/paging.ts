export interface StrippedPage<T> {
  content: T[];
  number: number;
  totalPages: number;
  size: number;
  last: boolean;
  first: boolean;
}