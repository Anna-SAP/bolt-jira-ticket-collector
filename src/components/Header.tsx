import React from 'react';
import { ClipboardList } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-lg shadow-md mb-6">
      <div className="flex items-center">
        <div className="mr-3 bg-white p-2 rounded-full">
          <ClipboardList className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">JIRA Ticket Collector</h1>
          <p className="text-blue-100">Extract, combine, and view multiple JIRA tickets with ease</p>
        </div>
      </div>
    </header>
  );
};

export default Header;