import { TicketResult, JqlResult } from '../types';

const JIRA_BASE_URL = 'https://jira.ringcentral.com/issues/';
const TICKET_PATTERN = /\b[A-Z]+-\d+\b/g;

/**
 * Extracts JIRA ticket IDs from the input text
 */
export const extractTickets = (text: string): TicketResult => {
  // Extract all matches
  const allMatches = text.match(TICKET_PATTERN) || [];
  
  // Get unique tickets
  const uniqueSet = new Set(allMatches);
  const uniqueMatches = Array.from(uniqueSet).sort();
  
  // Find duplicates
  const duplicates = allMatches.filter((item, index) => {
    return allMatches.indexOf(item) !== index;
  });
  const uniqueDuplicates = Array.from(new Set(duplicates));
  
  // For this MVP, we don't have specific validation rules beyond the regex pattern
  // In a real app, we might check ticket prefixes against valid projects
  const invalid: string[] = [];
  
  return {
    allMatches,
    uniqueMatches,
    duplicates: uniqueDuplicates,
    invalid
  };
};

/**
 * Creates a JQL query from the extracted tickets
 */
export const createJqlQuery = (tickets: string[]): JqlResult => {
  if (tickets.length === 0) {
    return {
      query: '',
      encodedUrl: ''
    };
  }
  
  // Create JQL query
  const ticketsString = tickets.join(',');
  const jqlQuery = `key in (${ticketsString})`;
  
  // Encode the query for URL
  const encodedQuery = encodeURIComponent(jqlQuery);
  const fullUrl = `${JIRA_BASE_URL}?jql=${encodedQuery}`;
  
  return {
    query: jqlQuery,
    encodedUrl: fullUrl
  };
};