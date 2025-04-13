const LookupHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return (
      <div>
        <h2>Lookup History</h2>
        <p className="emptyResults">No lookup history yet</p>
      </div>
    );
  }

  return (
    <div className="history">
      <h2>Lookup History</h2>

      <ul>
        {history?.map((item, index) => (
          <li key={index}>
            {item.domain} - (<span>{item.ips.join(', ')}</span>)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LookupHistory;
