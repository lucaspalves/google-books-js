import { SearchParams, SearchResult } from "./interfaces/search";

export class GoogleBookAPI {
  private BASE_URL = "https://www.googleapis.com/books/v1/volumes";

  public async search(params: SearchParams): Promise<SearchResult> {
    const response = await fetch(
      `${this.BASE_URL}?q=${this.formatSearchParamsToQueryString(params)}`
    );

    return (await response.json()) as SearchResult;
  }

  private formatSearchParamsToQueryString(params: SearchParams): string {
    const mappedFields: { [key: string]: string } = {
      title: "intitle",
      author: "inauthor",
      publisher: "inpublisher",
      subject: "subject",
      isbn: "isbn",
    };
    return Object.keys(params)
      .filter((param) => params[param as keyof SearchParams])
      .map(
        (param) =>
          `${mappedFields[param]}:${
            params[param as keyof SearchParams] as string
          }`
      )
      .join("&");
  }
}
