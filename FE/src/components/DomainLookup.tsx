import react, { useState } from 'react';
import { DomainLookupResponse } from './types';

interface Props {
  onLookup: (text: string) => any;
}

const DomainLookup: react.FC<Props> = ({ onLookup }) => {
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState<DomainLookupResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!domain.trim()) {
      setError('Please enter a domain');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const data = await onLookup(domain.trim());

      if (data.error) {
        setError(data.error);
        setResult(null);
      } else {
        setResult(data);
        setError('');
      }
    } catch (err) {
      setError('Error looking up domain');
      setResult(null);
    } finally {
      setLoading(false);
      setDomain('');
    }
  };

  return (
    <div>
      <h2>Domain Lookup</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={domain}
          onChange={e => setDomain(e.target.value)}
          placeholder="Enter a domain (e.g., www.ynet.co.il)"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Looking up...' : 'Lookup'}
        </button>
      </form>

      {error && <div className="errorText">{error}</div>}

      {result && (
        <div className="resultsWrapper">
          <p>Domain: {result?.domain}</p>
          <p>IP Addresses:</p>
          <ul className="resultsList">
            {result?.ips?.map((ip, index) => <li key={index}>{ip}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DomainLookup;
