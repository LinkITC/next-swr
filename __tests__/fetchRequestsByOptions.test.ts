import { fetchRequestsByOptions } from "../utils/fetchRequestsByOptions";

const externalRel = "noopener noreferrer";

describe("getRel", () => {
  it("should return empty data", () => {
    return fetchRequestsByOptions([]).then((data) => {
      expect(JSON.stringify(data)).toBe("{}");
    });
  });

  it("should return data", () => {
    return fetchRequestsByOptions([
      () => [
        {
          path: "/api",
          method: "get",
          fetcher: () => new Promise((res) => res(123)),
          params: { userId: 1 },
        },
      ],
    ]).then((data) => {
      expect(JSON.stringify(data)).toBe("{}");
    });
  });
});
