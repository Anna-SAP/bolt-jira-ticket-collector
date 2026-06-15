import React from 'react';
import { TicketResult, JqlResult } from '../types';
import TicketList from './TicketList';
import JiraLink from './JiraLink';

interface ResultsSectionProps {
  ticketResult: TicketResult;
  jqlResult: JqlResult;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ 
  ticketResult, 
  jqlResult 
}) => {
  if (ticketResult.uniqueMatches.length === 0) {
    return null;
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-3">Extracted Tickets</h2>
        
        <TicketList 
          title="Valid Tickets" 
          tickets={ticketResult.uniqueMatches} 
          type="valid" 
        />
        
        {ticketResult.duplicates.length > 0 && (
          <TicketList 
            title="De-duplicated Entries" 
            tickets={ticketResult.duplicates} 
            type="duplicate" 
          />
        )}
        
        {ticketResult.invalid.length > 0 && (
          <TicketList 
            title="Invalid Tickets (ignored)" 
            tickets={ticketResult.invalid} 
            type="invalid" 
          />
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-3">JIRA Link</h2>
        <JiraLink jqlResult={jqlResult} />
      </div>
    </div>
  );
};

export default ResultsSection;