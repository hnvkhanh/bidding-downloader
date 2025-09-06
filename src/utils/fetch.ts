import { parallelLimit } from 'async';

import { PER_PAGE } from "@/configs/core";
import getPage from './getPage';
import { getBiddingResultIds, sleep } from './helpers';
import getBiddingGoods from './getBiddingGoods';
import type { Item } from '@/configs/types';
import { exportItemsToBidCSV } from './exportItemsToBidCSV';


const getAllBiddingGoods = async (query: string, token: string): Promise<string> => {
  const allBiddingResultIds: string[] = [];
  const parsedQuery = JSON.parse(query);
  const { hasMore, content } = await getPage({ query: parsedQuery, page: 0, token });
  const biddingIds = getBiddingResultIds(content);
  allBiddingResultIds.push(...biddingIds);

  while (hasMore) {
    const nextPageNumber = Math.ceil(allBiddingResultIds.length / PER_PAGE);
    await sleep(1000); // Throttle requests to avoid overwhelming the server
    const { hasMore, content } = await getPage({ query: parsedQuery, page: nextPageNumber, token });
    const biddingIds = getBiddingResultIds(content);
    allBiddingResultIds.push(...biddingIds);
    if (!hasMore) {
      break;
    }
  }
  const tasks = allBiddingResultIds.map((id) => async () => getBiddingGoods(id));
  const allBiddingGoods: Item[] = await parallelLimit(tasks, 5);
  const flattedBiddingGoods = allBiddingGoods.flat();
  const csvContent = exportItemsToBidCSV({
    items: flattedBiddingGoods,
  });
  return csvContent;
}

export default getAllBiddingGoods;
