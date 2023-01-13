import { GoogleBookAPI } from "./api";
describe("Google Books API", () => {
  let API: GoogleBookAPI;
  beforeEach(() => {
    API = new GoogleBookAPI();
  });
  describe("Searching for books", () => {
    it("should correctly search books by title", async () => {
      const response = await API.search({
        title: "Bartleby",
      });

      expect(response.kind).toBe("books#volumes");
      expect(response.totalItems).toBeGreaterThanOrEqual(0);
      expect(response.items.length).toBeGreaterThan(0);
    });

    it("should correctly search books by author", async () => {
      const response = await API.search({
        author: "Ernest Hemingway",
      });

      expect(response.kind).toBe("books#volumes");
      expect(response.totalItems).toBeGreaterThanOrEqual(0);
      expect(response.items.length).toBeGreaterThan(0);
    });

    it("should correctly search books by subject", async () => {
      const response = await API.search({
        subject: "programming",
      });

      expect(response.kind).toBe("books#volumes");
      expect(response.totalItems).toBeGreaterThanOrEqual(0);
      expect(response.items.length).toBeGreaterThan(0);
    });

    it("should correctly search a book by its ISBN code", async () => {
      const response = await API.search({
        isbn: "9783458194668",
      });

      expect(response.kind).toBe("books#volumes");
      expect(response.totalItems).toBe(1);
      expect(response.items).toHaveLength(1);
    });
  });
});
