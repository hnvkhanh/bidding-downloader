import { TOKEN_BIDDING_GOODS } from "@/configs/core";
import type { BiddingGoodsResponse, Item, LotResultItem } from "@/configs/types";
import { sleep } from "./helpers";
import { parseItems } from "./parseItems";

const getBiddingGoods = async (id: string): Promise<Item[]> => {
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
  const lotResultItems = data.bideContractorInputResultDTO.lotResultItems || [];
  const items = lotResultItems.map((item: LotResultItem) => parseItems(item.formValue));
  return items.flat();
}

export default getBiddingGoods;
