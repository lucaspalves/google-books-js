import { Volume } from "../types/volume";

export interface SearchResult {
  kind: string;
  totalItems: number;
  items: Volume[];
}

export interface SearchParams {
  title?: string;
  author?: string;
  subject?: string;
  isbn?: string;
}
