import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface InputSectionProps {
  inputText: string;
  onInputChange: (text: string) => void;
  ticketCount: number;
  hasTickets: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({ 
  inputText, 
  onInputChange, 
  ticketCount,
  hasTickets
}) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold text-gray-800">Input Text</h2>
        <div className="text-sm text-gray-500 flex items-center">
          {hasTickets ? (
            <span className="text-green-600 font-semibold">
              {ticketCount} {ticketCount === 1 ? 'ticket' : 'tickets'} found
            </span>
          ) : (
            <span className="text-orange-500 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-1" /> No tickets detected
            </span>
          )}
        </div>
      </div>
      
      <textarea
        className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all min-h-[120px]"
        placeholder="Paste text containing JIRA tickets (e.g., LOC-20265, RLZ-93345)"
        value={inputText}
        onChange={(e) => onInputChange(e.target.value)}
      />
      
      <div className="mt-3 text-sm text-gray-500">
        Enter text containing JIRA ticket IDs in the format <code className="bg-gray-100 px-1 py-0.5 rounded">PROJECT-NUMBER</code>
      </div>
    </div>
  );
};

export default InputSection;