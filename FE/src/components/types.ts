export interface DomainLookupResponse {
  domain: string;
  ips: string[];
  error?: string;
}
