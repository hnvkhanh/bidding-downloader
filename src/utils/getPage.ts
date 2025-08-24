import { TOKEN } from "@/configs/core";
import type { FetchSinglePage, SearchResponse } from "@/configs/types";

const QUERY = [
  {
    "pageSize": 10,
    "pageNumber": 0,
    "query": [
      {
        "index": "es-contractor-selection",
        "keyWord": "máy tim",
        "matchType": "all-1",
        "matchFields": [
          "goods"
        ],
        "filters": [
          {
            "fieldName": "bidCloseDate",
            "searchType": "range",
            "from": "2024-11-03T00:00:00.000Z",
            "to": "2025-06-27T23:59:59.059Z"
          },
          {
            "fieldName": "investField",
            "searchType": "in",
            "fieldValues": [
              "HH"
            ]
          },
          {
            "fieldName": "bidCloseDate",
            "searchType": "range",
            "from": null,
            "to": "2025-06-01T16:30:21.557Z"
          },
          {
            "fieldName": "type",
            "searchType": "in",
            "fieldValues": [
              "es-notify-contractor"
            ]
          },
          {
            "fieldName": "caseKHKQ",
            "searchType": "not_in",
            "fieldValues": [
              "1"
            ]
          },
          {
            "fieldName": "statusForNotify",
            "searchType": "in",
            "fieldValues": [
              "CNTTT"
            ]
          }
        ]
      }
    ]
  }
];

const getPage = async (page: number): Promise<FetchSinglePage> => {
  const response = await fetch(`/api/services/smart/search?token=${TOKEN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify([{
      ...QUERY[0],
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
