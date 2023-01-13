import { Categories } from "./categories";

export type Volume = {
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: {
    title: string;
    averageRating: number;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: {
      type: string;
      identifier: string;
    }[];
    pageCount: number;
    printType: "BOOK";
    categories: Categories[];
    maturityRating: string;
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
  };
};
