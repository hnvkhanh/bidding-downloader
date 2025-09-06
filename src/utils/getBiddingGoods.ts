import type { BiddingGoodsResponse, Item, LotResultItem } from "@/configs/types";
import { sleep } from "./helpers";
import { parseItems } from "./parseItems";

const getBiddingGoods = async (id: string, token: string): Promise<Item[]> => {
  await sleep(1000); // Throttle requests to avoid overwhelming the server
  const response = await fetch(`/api/services/expose/contractor-input-result/get?token=${token}`, {
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
  const notifyNo = data.bideContractorInputResultDTO.notifyNo || '';
  const procuringEntityName = data.bideContractorInputResultDTO.procuringEntityName || '';
  const items = lotResultItems.map((item: LotResultItem) => {
    const formValues = parseItems(item.formValue);
    return formValues.map((fv) => ({
      ...fv,
      contractorName: item.contractorName,
      contractorCode: item.contractorCode,
      notifyNo,
      procuringEntityName
    }));
  });
  return items.flat();
}

export default getBiddingGoods;
