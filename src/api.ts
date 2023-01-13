import { SearchParams, SearchResult } from "./interfaces/search";
import { Volume } from "./types/volume";

interface GetVolumeError {
  error: {
    code: number;
    message: string;
    errors: {
      message: string;
      domain: string;
      reason: string;
    };
  }[];
}

export class GoogleBookAPI {
  private BASE_URL = "https://www.googleapis.com/books/v1/volumes";

  public async search(params: SearchParams): Promise<SearchResult> {
    const response = await fetch(
      `${this.BASE_URL}?q=${this.formatSearchFiltersToQueryString(
        params.filters
      )}`
    );

    return (await response.json()) as SearchResult;
  }

  private formatSearchFiltersToQueryString(
    filters: SearchParams["filters"]
  ): string {
    const mappedFields: { [key: string]: string } = {
      title: "intitle",
      author: "inauthor",
      publisher: "inpublisher",
      subject: "subject",
      isbn: "isbn",
    };
    return Object.keys(filters)
      .filter((param) => filters[param as keyof SearchParams["filters"]])
      .map(
        (param) =>
          `${mappedFields[param]}:${
            filters[param as keyof SearchParams["filters"]] as string
          }`
      )
      .join("&");
  }

  public async getVolume(volumeId: string): Promise<Volume> {
    const response = await fetch(`${this.BASE_URL}/${volumeId}`);
    const data = (await response.json()) as Volume | GetVolumeError;

    if ((data as GetVolumeError).error) {
      throw Error("Volume not found");
    }
    return data as Volume;
  }
}
