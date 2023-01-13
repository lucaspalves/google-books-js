import { GoogleBookAPI } from "./api";
describe("Google Books API", () => {
  let API: GoogleBookAPI;
  beforeEach(() => {
    API = new GoogleBookAPI();
  });
  describe("Searching for books", () => {
    describe("Running a search with filters", () => {
      it("should correctly search books by title", async () => {
        const response = await API.search({
          filters: {
            title: "Bartleby",
          },
        });

        expect(response.kind).toBe("books#volumes");
        expect(response.totalItems).toBeGreaterThanOrEqual(0);
        expect(response.items).toHaveLength(10);
      });

      it("should correctly search books by author", async () => {
        const response = await API.search({
          filters: {
            author: "Ernest Hemingway",
          },
        });

        expect(response.kind).toBe("books#volumes");
        expect(response.totalItems).toBeGreaterThanOrEqual(0);
        expect(response.items).toHaveLength(10);
      });

      it("should correctly search books by subject", async () => {
        const response = await API.search({
          filters: {
            subject: "programming",
          },
        });

        expect(response.kind).toBe("books#volumes");
        expect(response.totalItems).toBeGreaterThanOrEqual(0);
        expect(response.items).toHaveLength(10);
      });

      it("should correctly search a book by its ISBN code", async () => {
        const response = await API.search({
          filters: {
            isbn: "9783458194668",
          },
        });

        expect(response.kind).toBe("books#volumes");
        expect(response.totalItems).toBe(1);
        expect(response.items).toHaveLength(1);
      });
    });
  });

  describe("Getting a specific volume", () => {
    it("should correctly get a volume by its ID", async () => {
      const response = await API.getVolume("1BD3uwEACAAJ");

      expect(response.id).toBe("1BD3uwEACAAJ");
      expect(response.kind).toBe("books#volume");
      expect(response).toHaveProperty("volumeInfo");
    });

    it("should return an error if no volume was found", async () => {
      await expect(API.getVolume("invalid-volume")).rejects.toThrow(
        "Volume not found"
      );
    });
  });
});
