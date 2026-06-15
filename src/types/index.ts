export interface TicketResult {
  allMatches: string[];
  uniqueMatches: string[];
  duplicates: string[];
  invalid: string[];
}

export interface JqlResult {
  query: string;
  encodedUrl: string;
}