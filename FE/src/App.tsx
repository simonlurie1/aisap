import { useState, useEffect } from 'react';
import './App.css';
import HostInfo from './components/HostInfo';
import DomainLookup from './components/DomainLookup';
import LookupHistory from './components/LookupHistory';
import { DomainLookupResponse } from './components/types';

const App = () => {
  const [hostInfo, setHostInfo] = useState({ internal_ip: 'Loading...', public_ip: 'Loading...' });
  const [history, setHistory] = useState([]);

  // Fetch host info and history on component mount
  useEffect(() => {
    fetchHostInfo();
    fetchHistory();
  }, []);

  const fetchHostInfo = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/host-ip');
      const data = await response.json();
      setHostInfo(data);
    } catch (error) {
      console.error('Error fetching host info:', error);
      setHostInfo({ internal_ip: 'Error fetching data', public_ip: 'Error fetching data' });
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/history');
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleLookup = async (domain: string) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/lookup/${encodeURIComponent(domain)}`,
      );
      const data = await response.json();

      // Refresh history after a successful lookup
      fetchHistory();

      return data;
    } catch (error) {
      console.error('Error looking up domain:', error);
      return { error: 'Error looking up domain' };
    }
  };

  return (
    <div>
      <header>IP Lookup Tool</header>

      <main>
        <HostInfo internalIp={hostInfo.internal_ip} publicIp={hostInfo.public_ip} />
        <DomainLookup onLookup={handleLookup} />
        <LookupHistory history={history} />
      </main>
    </div>
  );
};

export default App;
