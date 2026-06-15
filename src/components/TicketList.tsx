import React from 'react';
import { Tag, Copy, CheckCircle2, AlertCircle } from 'lucide-react';

interface TicketListProps {
  title: string;
  tickets: string[];
  type: 'valid' | 'duplicate' | 'invalid';
}

const TicketList: React.FC<TicketListProps> = ({ title, tickets, type }) => {
  const [copiedIndex, setCopiedIndex] = React.useState<number | null>(null);

  if (tickets.length === 0) {
    return null;
  }

  const copyTicket = (ticket: string, index: number) => {
    navigator.clipboard.writeText(ticket);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const getTicketStyle = () => {
    switch (type) {
      case 'valid':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'duplicate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'invalid':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'valid':
        return <Tag className="h-4 w-4 mr-1" />;
      case 'duplicate':
        return <AlertCircle className="h-4 w-4 mr-1" />;
      case 'invalid':
        return <AlertCircle className="h-4 w-4 mr-1" />;
      default:
        return <Tag className="h-4 w-4 mr-1" />;
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-md font-semibold text-gray-700 mb-2 flex items-center">
        {getIcon()}
        {title} ({tickets.length})
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {tickets.map((ticket, index) => (
          <div 
            key={`${ticket}-${index}`} 
            className={`px-3 py-1 rounded-md border flex items-center text-sm ${getTicketStyle()}`}
          >
            <span>{ticket}</span>
            <button 
              className="ml-2 p-1 hover:bg-white/30 rounded-full transition-colors"
              onClick={() => copyTicket(ticket, index)}
              title="Copy ticket"
            >
              {copiedIndex === index ? 
                <CheckCircle2 className="h-3.5 w-3.5" /> : 
                <Copy className="h-3.5 w-3.5" />
              }
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;