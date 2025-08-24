import parallelLimit from 'async/parallelLimit';

import { PER_PAGE } from "@/configs/core";
import getPage from './getPage';
import { getBiddingResultIds, sleep } from './helpers';
import getBiddingGoods from './getBiddingGoods';
import type { Item } from '@/configs/types';


const getAllBiddingGoods = async (): Promise<Item[]> => {
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
  const allBiddingGoods: Item[] = await parallelLimit(tasks, 5);
  const flattedBiddingGoods = allBiddingGoods.flat();
  console.log("Fetched all bidding goods:", allBiddingGoods);
  return flattedBiddingGoods;
}

export default getAllBiddingGoods;
