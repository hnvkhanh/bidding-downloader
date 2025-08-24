import type { Content } from "@/configs/types";

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const getBiddingResultIds = (content: Content[]): string[] => {
  return content.map(item => item.inputResultId);
}
