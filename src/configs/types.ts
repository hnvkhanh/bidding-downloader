export interface Content {
  inputResultId: string;
}

export interface SearchResponse { page: { totalPages: number; currentPage: number, content: Content[] } }

export interface FetchSinglePage {
  hasMore: boolean;
  content: Content[];
  totalPages: number;
}

export interface LotResultItem {
  formValue: string;
}

export interface BiddingGoodsResponse {
  bideContractorInputResultDTO: {
    lotResultItems: LotResultItem[];
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

export interface Item {
  id: number;
  name: string;
  uom: string;                 // Unit of measure (e.g. "Miếng", "Cuộn")
  qty: number;
  origin: string;
  label?: string;
  bidPrice: number;
  amount: number;
  bidAmount?: string;
  codeGood?: string;
  labelGood?: string;
  yearManufacture?: string;
  manufacturer?: string;
  feature?: string;
  otherInfo?: string;
  exwUnitPrice?: string;
  exwPrice?: string;
  cost?: string;
  tax?: number | null;
  cPeriod?: string;
  investCapital?: string;
  ratedQuantity?: string;
  circulationNum?: string;
  model?: string;
  parent?: number;
  currentItemIndex?: string;
  pos?: string;
  title?: string;
  amountTotal?: number;
  priceIncludeTax?: string;
  priceExcludeTax?: string;
  unitPrice?: string;
  amountBeforeTax?: string;
  importTax?: string;
  taxSpecial?: string;
  lotNo?: string | null;
  lotName?: string | null;
  code?: string | null;
  group?: string | null;
  bidItem?: string;
  formCode?: string;
  nameTable?: string;
  originQty?: number;
  maHS?: string;
  lotPrice?: number;
  lotWiningPrice?: number;

  // allow additional keys
  [key: string]: unknown;
}
