import parallelLimit from 'async/parallelLimit';

import { PER_PAGE, TOKEN, TOKEN_BIDDING_GOODS } from "@/configs/core";
import type { BiddingGoodsResponse, BiddingInfo, Content, FetchSinglePage, SearchResponse } from "@/configs/types";

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

const extractProductInfo = (jsonLikeString: string): BiddingInfo => {
  const regex = /"name":"([^"]+?)".*?"uom":"([^"]+?)".*?"brand":"([^"]+?)".*?"manufacture":"([^"]+?)".*?"goodsOrigin":"([^"]+?)".*?"manufactureYear":"([^"]+?)".*?"specification":"([^"]+?)"/s;
  const match = jsonLikeString.match(regex);

  if (!match) return {} as BiddingInfo;

  const [
    ,
    name,
    uom,
    brand,
    manufacture,
    goodsOrigin,
    manufactureYear,
    specification
  ] = match;

  return {
    name,
    uom,
    brand,
    manufacture,
    goodsOrigin,
    manufactureYear,
    specification
  };
}


const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}


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

const getBiddingResultIds = (content: Content[]): string[] => {
  return content.map(item => item.inputResultId);
}

const getBiddingGoods = async (id: string): Promise<string> => {
  await sleep(1000); // Throttle requests to avoid overwhelming the server
  const response = await fetch(`/api/services/expose/contractor-input-result/get?token=${TOKEN_BIDDING_GOODS}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id })
  });
  if (!response.ok) {
    throw new Error("Failed to fetch bidding goods");
  }

  const data: BiddingGoodsResponse = await response.json();
  console.log("Fetched bidding goods data for ID:", id, "Data:",   data.bideContractorInputResultDTO.lotResultDTO);
  const value =  data.bideContractorInputResultDTO.lotResultDTO?.[0]?.goodsList || "";
  console.log("Fetched bidding goods for ID:", id, "Value:", JSON.parse(value));
  return value;
}

export const getAllBiddingGoods = async (): Promise<string[]> => {
  const allBiddingResultIds: string[] = [];
  const { hasMore, content } = await getPage(0);
  const biddingIds = getBiddingResultIds(content);
  allBiddingResultIds.push(...biddingIds);

  while (hasMore) {
    const nextPageNumber = Math.ceil(allBiddingResultIds.length / PER_PAGE);
    await sleep(1000); // Throttle requests to avoid overwhelming the server
    const { hasMore, content } = await getPage(nextPageNumber);
    const biddingIds = getBiddingResultIds(content);
    allBiddingResultIds.push(...biddingIds);
    break; // Remove this line if you want to continue fetching until no more pages
    if (!hasMore) {
      break;
    }
  }
  const tasks = allBiddingResultIds.map((id) => async () => getBiddingGoods(id));
  const allBiddingGoods: string[] = await parallelLimit(tasks, 5);
  console.log("Fetched all bidding goods:", allBiddingGoods);
  return allBiddingGoods.flat();
}

export const dummy = () => { };