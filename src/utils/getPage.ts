import type { FetchSinglePage, SearchResponse } from "@/configs/types";

const getPage = async ({ query, page, token }: { query: object, page: number, token: string }): Promise<FetchSinglePage> => {
  const response = await fetch(`/api/proxy/services/smart/search?token=${token}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{
      ...query,
      pageNumber: page,
    }]),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch data")
  }

  const data: SearchResponse = await response.json();

  const { totalPages, currentPage } = data.page;

  const pageNumber = currentPage + 1;

  const hasMore = pageNumber < totalPages;
  return {
    hasMore,
    content: data.page.content,
    totalPages,
  }

}

export default getPage;
