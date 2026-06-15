import React, { useState } from 'react';
import { JqlResult } from '../types';
import { ExternalLink, Copy, CheckCircle2 } from 'lucide-react';

interface JiraLinkProps {
  jqlResult: JqlResult;
}

const JiraLink: React.FC<JiraLinkProps> = ({ jqlResult }) => {
  const [copied, setCopied] = useState(false);
  
  if (!jqlResult.query) {
    return null;
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jqlResult.encodedUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="p-3 bg-gray-50 rounded-md border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-700 mb-2">JQL Query:</h3>
        <div className="p-2 bg-gray-100 rounded font-mono text-sm overflow-x-auto">
          {jqlResult.query}
        </div>
      </div>
      
      <div className="flex flex-col space-y-3">
        <a 
          href={jqlResult.encodedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Open in JIRA
        </a>
        
        <button
          onClick={copyToClipboard}
          className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          {copied ? (
            <>
              <CheckCircle2 className="h-4 w-4 mr-2 text-green-600" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              <span>Copy JIRA URL</span>
            </>
          )}
        </button>
      </div>
      
      <div className="mt-2 p-3 bg-blue-50 rounded-md border border-blue-100">
        <h3 className="text-sm font-semibold text-blue-700 mb-2">Encoded URL:</h3>
        <div className="p-2 bg-white rounded font-mono text-xs text-gray-700 break-all">
          {jqlResult.encodedUrl}
        </div>
      </div>
    </div>
  );
};

export default JiraLink;