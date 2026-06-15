import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import { extractTickets, createJqlQuery } from './utils/jiraUtils';
import { TicketResult, JqlResult } from './types';

function App() {
  const [inputText, setInputText] = useState<string>('');
  const [ticketResult, setTicketResult] = useState<TicketResult>({
    allMatches: [],
    uniqueMatches: [],
    duplicates: [],
    invalid: []
  });
  const [jqlResult, setJqlResult] = useState<JqlResult>({
    query: '',
    encodedUrl: ''
  });
  
  // Process the input text whenever it changes
  useEffect(() => {
    const result = extractTickets(inputText);
    setTicketResult(result);
    
    // Create JQL query from unique tickets
    const jql = createJqlQuery(result.uniqueMatches);
    setJqlResult(jql);
  }, [inputText]);
  
  const handleInputChange = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <Header />
        
        <main className="space-y-6 mb-12">
          <InputSection 
            inputText={inputText} 
            onInputChange={handleInputChange}
            ticketCount={ticketResult.uniqueMatches.length}
            hasTickets={ticketResult.uniqueMatches.length > 0} 
          />
          
          <ResultsSection 
            ticketResult={ticketResult}
            jqlResult={jqlResult}
          />
        </main>
        
        <footer className="text-center text-gray-500 text-sm">
          <p>© 2025 JIRA Ticket Collector | Designed for efficiency</p>
        </footer>
      </div>
    </div>
  );
}

export default App;