export interface Content {
  inputResultId: string;
}

export interface SearchResponse { page: { totalPages: number; currentPage: number, content: Content[] } }

export interface FetchSinglePage {
  hasMore: boolean;
  content: Content[];
  totalPages: number;
}

export interface BiddingGoodsResponse {
  bideContractorInputResultDTO: {
    lotResultDTO: {
      goodsList: string;
    }[];
  };
}

export interface BiddingInfo {
  name: string | undefined;
  uom: string | undefined;
  brand: string | undefined;
  manufacture: string | undefined;
  goodsOrigin: string | undefined;
  manufactureYear: string | undefined;
  specification: string | undefined;
}