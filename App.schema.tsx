export interface FilteredOptions {
  symbol: string;
  name: string;
  type: string;
  region: string;
  marketOpen: string;
  marketClose: string;
  timezone: string;
  currency: string;
  matchScore: string;
  price?: string;
  filteredOptions?: object;
  companyOverview?: object;
  length: number;
}

export interface StockObjInfo {
  currency: string;
  marketClose: string;
  marketOpen: string;
  marketScore: string;
  name: string;
  region: string;
  symbol: string;
  timezone: string;
  type: string;
  price: string;
}

export interface BestMatchesInfo {
  matchScore: string;
  region: string;
}
